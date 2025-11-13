export interface ProductSummary {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductDetail extends ProductSummary {
  description: string;
  downloadUrl: string;
}
