import axios from "axios";
import {Product} from "../model/Product";
import { ProductProperty } from "../model/ProductProperty";
import { Shelf } from "../model/Shelf";
import { ShelfProduct } from "../model/ShelfProduct";

export const getProducts = async (promo? : boolean) => {
    if (promo) {
        const response = await axios.get<Product[]>('http://localhost:3001/products?discount=true');
        return response.data;
    } else {
        const response = await axios.get<Product[]>('http://localhost:3001/products');
        return response.data;
    }
}

export const getProduct = async (id: string) => {
    const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
    return response.data;
}

export const createProduct = async (product: Omit<Product, "id">) => {
    const response = await axios.post<Product>(`http://localhost:3001/products`, product);
    return response.data;
}

export const updateProduct = async (product: Product) => {
    const response = await axios.put<Product>(`http://localhost:3001/products/${product.id}`, product);
    return response.data;
}


export const deleteProduct = async (id: number) => {
    Promise.all([
        axios.delete<Product>(`http://localhost:3001/products/${id}`),
        axios.delete<ShelfProduct>(`http://localhost:3001/shelfProducts?productId=${id}`),
        axios.delete<ProductProperty>(`http://localhost:3001/productproperties?productId=${id}`),
    ]).then((values) => {
        return values;
    });
}

export const getStoredProductsFromProduct = async (product: number) => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts?productId=${product}`);
    return response.data;
}

export const getStoredProducts = async () => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts`);
    return response.data;
}

export const storeProduct = async (shelfProduct: Omit<ShelfProduct, "id">) => {
    const response = await axios.post<ShelfProduct>(`http://localhost:3001/shelfproducts`, shelfProduct);
    return response.data;
}

export const updateStoredProduct = async (shelfProduct: ShelfProduct) => {
    const response = await axios.put<ShelfProduct>(`http://localhost:3001/shelfproducts/${shelfProduct.id}`, shelfProduct);
    return response.data;
}

export const deleteStoredProduct = async (id: number) => {
    const response = await axios.delete<ShelfProduct>(`http://localhost:3001/shelfproducts/${id}`);
    return response.data;
}