export interface ProductFilter {
    text?: string;
    brand?: string;
    category?: string;
    price?: "asc" | "desc";
    offer?: string;
    page?: number;
}