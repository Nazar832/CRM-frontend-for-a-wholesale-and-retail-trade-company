import { IDeal } from "../deals/deal.model";

export interface IBuyer {
  _id?: string,
  name?: string,
  phoneNumber?: string,
  contactPerson?: string,
  address?: string,
}

export interface IBuyerDetailed extends IBuyer {
  deals_: IDeal[],
}
