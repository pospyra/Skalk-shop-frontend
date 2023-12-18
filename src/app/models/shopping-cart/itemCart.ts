import { ProductDTO } from "../product";


export interface ItemCartDTO {
  id: number;
  product: ProductDTO | null;
  quantity: number;
  price: number;
  totalAmount: number;
  shoppingCartId: number;
  clickUrl?: string;
}
