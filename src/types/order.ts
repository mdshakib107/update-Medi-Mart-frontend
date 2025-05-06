import { IUser } from "./customer";
import { TMedicine } from "./medicine";

export interface IProductItem {
  _id: string;
  productId: string;
  quantity: number;
  product?: TMedicine;
}

export type ShippingStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export interface IOrderDB {
  _id: string;
  products: IProductItem[];
  user: IUser;
  totalPrice: number;
  shippingStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | string;
  transactionId: string;
  isDeleted: boolean;
  city: string;
  shippingAddress: string;
}
