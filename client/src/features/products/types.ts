/**
 * Represents the lightweight product object
 * from the GET /api/products endpoint.
 */
export interface ProductSummary {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

/**
 * Represents the full product detail object
 * from the GET /api/products/:id endpoint.
 * (Based on your API docs)
 */
export interface ProductDetail extends ProductSummary {
  description: string;
  downloadUrl: string;
}
