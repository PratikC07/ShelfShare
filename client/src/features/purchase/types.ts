/**
 * The request payload for the POST /api/purchase endpoint.
 */
export interface PurchaseRequest {
  productId: string;
}

/**
 * The success response from the POST /api/purchase endpoint.
 */
export interface PurchaseResponse {
  message: string;
  creditsAwarded: number;
}

/**
 * Represents a product in the user's library.
 * From GET /me/purchases
 */
export interface PurchasedProduct {
  _id: string;
  name: string;
  imageUrl: string;
  downloadUrl: string;
}
