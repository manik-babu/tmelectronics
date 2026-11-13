export interface GuestCartItem {
    productId: string;
    colorId: string;
    quantity: number;
    cartId: string;
}
export interface OrderDetails {
    name: string;
    phone: string;
    address: string;
    userId: string | null;
    note: string | null;
}
export interface OrderProduct {
    productId: string;
    colorId: string;
    quantity: number;
}
export interface OrderRequest {
    details: OrderDetails;
    products: OrderProduct[];
}

export interface OrderProductDetails {
    product: {
        id: string;
        sku: string;
        title: string;
        price: number;
    };
    color: {
        id: string;
        name: string;
        stock: number;
    };
    quantity: number;
}