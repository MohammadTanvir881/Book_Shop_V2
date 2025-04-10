export interface TOrderUser {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface TOrderProduct {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface TOrder {
  address: string;
  phone: string;
  _id: string;
  user: TOrderUser;
  products: TOrderProduct[];
  shippingAddress: string;
  phoneNumber: string;
  paymentMethod: string;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus?: 'unpaid' | 'paid' | 'refunded';
  transaction?: {
    id: string;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default TOrder;
