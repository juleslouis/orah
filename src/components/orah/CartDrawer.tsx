import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

function formatPrice(amount: number, currency: string) {
  return `${amount.toLocaleString("fr-FR")} ${currency}`;
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    isLoading,
    isSyncing,
    closeCart,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "€";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (!url) return;
    window.open(url, "_blank");
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Panier"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[90] flex w-full max-w-[520px] flex-col bg-paper text-ink shadow-[0_0_60px_-10px_rgba(0,0,0,0.25)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-rule/60 px-8 py-6">
          <div>
            <div className="eyebrow">Panier</div>
            <div className="mt-2 font-display text-[22px] leading-none">
              {totalItems === 0
                ? "Votre écrin est vide"
                : `${totalItems} pièce${totalItems > 1 ? "s" : ""}`}
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer"
            className="text-[11px] uppercase tracking-[0.28em] text-ink-soft hover:text-ink transition-colors"
          >
            Fermer
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mx-auto h-px w-10 rule-gold" />
              <p className="mt-8 max-w-xs text-[14px] leading-[1.8] text-ink-soft">
                Aucune pièce n'attend encore votre nom.
                <br />
                Parcourez la collection.
              </p>
              <button
                onClick={closeCart}
                className="mt-10 border-b border-ink/60 pb-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-brass-deep hover:border-brass-deep transition-colors"
              >
                Revenir à la collection
              </button>
            </div>
          ) : (
            <ul className="space-y-10">
              {items.map((item) => (
                <li key={item.variantId} className="grid grid-cols-[88px_1fr] gap-6">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="eyebrow">{item.category}</div>
                    <div className="mt-1 flex items-start justify-between gap-4">
                      <h4 className="font-display text-[18px] leading-tight">
                        {item.name}
                      </h4>
                      <div className="font-display text-[16px] tabular-nums text-ink-soft">
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center border border-ink/20">
                        <button
                          disabled={isLoading}
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          aria-label="Diminuer"
                          className="h-9 w-9 text-ink-soft hover:text-ink transition-colors disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-[13px] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          disabled={isLoading}
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          aria-label="Augmenter"
                          className="h-9 w-9 text-ink-soft hover:text-ink transition-colors disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-[10px] uppercase tracking-[0.28em] text-ink-muted hover:text-ink transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-rule/60 bg-paper px-8 pb-8 pt-6">
            <dl className="space-y-3 text-[13px]">
              <div className="flex justify-between text-ink-soft">
                <dt>Sous-total</dt>
                <dd className="tabular-nums">
                  {formatPrice(subtotal, currency)}
                </dd>
              </div>
              <div className="flex justify-between text-ink-muted">
                <dt>Livraison</dt>
                <dd>Offerte — 24 à 72h</dd>
              </div>
              <div className="flex justify-between text-ink-muted">
                <dt>Emballage</dt>
                <dd>Coffret bois signé</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-rule/60 pt-6">
              <span className="eyebrow">Total</span>
              <span className="font-display text-[26px] tabular-nums text-ink">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="mt-8 w-full border border-ink bg-ink py-5 text-[11px] uppercase tracking-[0.32em] text-paper transition-colors duration-500 hover:bg-brass-deep hover:border-brass-deep disabled:opacity-60"
            >
              {isLoading || isSyncing
                ? "Un instant…"
                : "Passer à la caisse"}
            </button>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.24em] text-ink-muted">
              Paiement sécurisé — Shopify
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
