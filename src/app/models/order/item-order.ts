export interface ItemOrderDTO {
  id: number;
  mpn?: string;
  offerId: number;
  clickUrl?: string;
  quantity: number;
  price: number;
  totalAmount: number;
  orderId: number;
}
