export interface ProductDTO {
    id: number;
    mpn?: string | null;
    manufacturerName?: string | null;
    companyName?: string | null;
    offers: OfferDTO[];
}

export interface OfferDTO {
    id?: number | null;
    clickUrl?: string | null;
    inventoryLevel: number;
    prices?: PriceDTO[] | null;
}

export interface PriceDTO {
    priceValue: number;
    currency?: string | null;
    quantity: number;
}
