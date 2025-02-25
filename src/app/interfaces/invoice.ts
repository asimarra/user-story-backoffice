export interface Invoice {
  productId: string;
  quantity: number;
}

export interface InvoiceResponse {
  error: boolean;
  data: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      status: string;
      role: string;
    };
    products: {
      product: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        status: string;
      };
      quantity: number;
    }[];
    total: number;
    status: string;
    createdAt: string;
  };
}
