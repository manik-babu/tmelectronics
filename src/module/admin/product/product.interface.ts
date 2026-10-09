export interface ProductSchema {
    data: ProductData;
    images: {
        url: string;
    }[];
}

export interface ProductData {
    title: string;
    description: string;
    price: number;
    brand_name: string;
    category_name: string;
    colors: ProductColor[];
}

export interface ProductColor {
    name: string;
    stock: number;
}
