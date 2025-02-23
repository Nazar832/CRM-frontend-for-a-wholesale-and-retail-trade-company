import { IBuyer } from "../buyers/buyer.model";

export type Product = {
  product: string,
  amount: number,
}

/* export interface IDealResponse {
  _id?: string,
  products?: Product[],
  buyer?: string,
  wholesale?: boolean,
  totalPrice?: number,
  status?: string,
} */

export interface IDeal {
  _id?: string,
  products?: Product[],
  buyerName?: string,
  contactPersonPhone?: string,
  wholesale?: boolean,
  totalPrice?: number,
  status?: string,
  createdAt: string,
  updatedAt: string,
}

export interface IDealExtended {
  _id?: string,
  products?: Product[],
  buyer: IBuyer,
  wholesale?: boolean,
  totalPrice?: number,
  status?: string,
  createdAt: string,
  updatedAt: string,
}
