import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchCartTotals,
} from "@/lib/shopify";

export interface CartItem {
  lineId: string | null;
  variantId: string; // gid://shopify/ProductVariant/xxx
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "lineId" | "quantity"> & { quantity?: number }) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: async (input) => {
        const { items, cartId, clearCart } = get();
        const quantity = input.quantity ?? 1;
        const existing = items.find((i) => i.variantId === input.variantId);
        set({ isLoading: true });

        try {
          if (!cartId) {
            const res = await createShopifyCart(input.variantId, quantity);
            if (res) {
              set({
                cartId: res.cartId,
                checkoutUrl: res.checkoutUrl,
                items: [{ ...input, quantity, lineId: res.lineId }],
                isOpen: true,
              });
            }
          } else if (existing && existing.lineId) {
            const newQty = existing.quantity + quantity;
            const res = await updateShopifyCartLine(cartId, existing.lineId, newQty);
            if (res.success) {
              const current = get().items;
              set({
                items: current.map((i) =>
                  i.variantId === input.variantId ? { ...i, quantity: newQty } : i,
                ),
                isOpen: true,
              });
            } else if (res.cartNotFound) {
              clearCart();
            }
          } else {
            const res = await addLineToShopifyCart(cartId, input.variantId, quantity);
            if (res.success) {
              const current = get().items;
              set({
                items: [...current, { ...input, quantity, lineId: res.lineId ?? null }],
                isOpen: true,
              });
            } else if (res.cartNotFound) {
              clearCart();
            }
          }
        } catch (e) {
          console.error("addItem failed:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) return get().removeItem(variantId);
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const res = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (res.success) {
            const current = get().items;
            set({
              items: current.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i,
              ),
            });
          } else if (res.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const res = await removeLineFromShopifyCart(cartId, item.lineId);
          if (res.success) {
            const current = get().items;
            const next = current.filter((i) => i.variantId !== variantId);
            if (next.length === 0) clearCart();
            else set({ items: next });
          } else if (res.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () =>
        set({ items: [], cartId: null, checkoutUrl: null }),

      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const cart = await fetchCartTotals(cartId);
          if (cart === null) return; // API error, preserve
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (e) {
          console.error("syncCart:", e);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "orah-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        items: s.items,
        cartId: s.cartId,
        checkoutUrl: s.checkoutUrl,
      }),
    },
  ),
);
