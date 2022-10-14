export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    location: Location;
    image: string;
    discount: boolean;
}