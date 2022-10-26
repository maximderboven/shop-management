import { Property as propertyitem } from './Property';
import { Product as ProductItem } from './Product';

export interface ProductProperties {
    productId: number;
    propertyId: number;
    value: string;
}