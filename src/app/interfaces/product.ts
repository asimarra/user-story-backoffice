export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  DELETED = 'DELETED',
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface UpdateProductResponse {
  error: boolean;
  data: string | { productId: string };
}

export const statusOptionsData = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
  { label: 'Discontinued', value: 'DISCONTINUED' },
  { label: 'Deleted', value: 'DELETED' },
];
