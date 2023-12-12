import { ItemCartDTO } from "./itemCart";


export interface ShoppingCartDTO {
  id: number,
  totalPrice: number,
  itemShoppingCarts: ItemCartDTO[]
}
