import { PriceDTO } from "../product";

export interface AddToCartModel {
  prices: PriceDTO[];
  mnp: string;
  offerId: number;
}
