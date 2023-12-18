export interface ProductDTO {
    id: number;
    mpn?: string | null;
    manufacturerName?: string | null;
    company?: CompanyDTO ;
    offers: OfferDTO[];
}

export interface OfferDTO {
    id?: number | null;
    clickUrl?: string | null;
    inventoryLevel: number;
    prices?: PriceDTO[] | null;
    moq?: number | null;
}

export interface PriceDTO {
    priceValue: number;
    currency?: string | null;
    quantity: number;
}

export interface CompanyDTO {
  id?: number;
  name?: string;
}
