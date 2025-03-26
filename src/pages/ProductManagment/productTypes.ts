/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  image: string | undefined;
  data: Product;
  _id?: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  stock: number;

  author: string;
  quantity: number;
  model: string;
  description?: string;
}
