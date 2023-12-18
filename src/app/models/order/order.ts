import { UserDTO } from "../user/user";
import { ItemOrderDTO } from "./item-order";
import { OrderStatus } from "./order-status";


export interface OrderDTO {
  id: number;
  companyName?: string;
  address?: string;
  createdAt: Date;
  userId: number;
  user?: UserDTO;
  itemsOrder?: ItemOrderDTO[];
  orderStatus: OrderStatus;
}
