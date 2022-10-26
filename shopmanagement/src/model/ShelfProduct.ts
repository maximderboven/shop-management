import {Shelf as ShelfItem} from "./Shelf";
import {Product as productItem} from './Product';
export interface ShelfProduct {
    id: number;
    productId: number;
    shelfId: number;
    spot: number;
    quantity: number;
    MaxQuantity: number;
}