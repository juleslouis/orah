// Shopify Storefront API client + cart mutations
export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "orah-ois7r-rbrk84yf.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "b34284fde00318d0cbb0f6f6ec692499";

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<any> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    console.error("Shopify API: payment required (billing plan needed).");
    return null;
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }
  return data;
}

/* ------------------------ CART QUERIES / MUTATIONS ------------------------ */

const CART_QUERY = /* GraphQL */ `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
    }
  }
`;

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type UserError = { field: string[] | null; message: string };

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(errors: UserError[]): boolean {
  return errors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export async function createShopifyCart(
  variantId: string,
  quantity: number,
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const errs: UserError[] = data?.data?.cartCreate?.userErrors ?? [];
  if (errs.length) {
    console.error("cartCreate:", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return {
    cartId: cart.id,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lineId,
  };
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const errs: UserError[] = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) {
    console.error("cartLinesAdd:", errs);
    return { success: false };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find(
    (l: { node: { merchandise: { id: string } } }) =>
      l.node.merchandise.id === variantId,
  );
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs: UserError[] = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const errs: UserError[] = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) return { success: false };
  return { success: true };
}

export async function fetchCartTotals(cartId: string) {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  return data?.data?.cart ?? null;
}
