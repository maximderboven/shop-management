import { Property as propertyitem } from './Property';
import { Product as ProductItem } from './Product';

export interface ProductProperty {
    id: number;
    productId: number;
    propertyId: number;
    value: string;
}