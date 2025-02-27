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
