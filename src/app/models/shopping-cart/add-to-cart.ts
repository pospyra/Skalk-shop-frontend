import { PriceDTO } from "../product";

export interface AddToCartModel {
  id: number;
  prices: PriceDTO[];
  mpn: string;
  offerId: number;
  clickUrl: string;
  moq: number;
  isNewItem: boolean;
  quantity: number;
}
