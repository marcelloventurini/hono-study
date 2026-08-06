export interface Sale {
  id: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
}

// necessário para realizar uma venda: produtos, quantidade de produtos, preço dos produtos
export interface CreateSaleRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}
