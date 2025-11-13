export interface PurchaseRequest {
  productId: string;
}

export interface PurchaseResponse {
  message: string;
  creditsAwarded: number;
}

export interface PurchasedProduct {
  _id: string;
  name: string;
  imageUrl: string;
  downloadUrl: string;
}
