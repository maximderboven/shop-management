export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: boolean;
    discountPercentage: number;
}

export type ProductItem = Omit<Product, "id">;