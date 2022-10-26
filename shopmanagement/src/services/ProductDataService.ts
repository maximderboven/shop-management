import axios from "axios";
import {Product} from "../model/Product";
import { Shelf } from "../model/Shelf";
import { ShelfProduct } from "../model/ShelfProduct";

export const getProducts = async () => {
    const response = await axios.get<Product[]>('http://localhost:3001/products');
    return response.data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
    return response.data;
}

export const getProductsFromStoredProducts = async (id: number[]) => {
    const response = await axios.get<Product[]>(`http://localhost:3001/products?id=${id.join("&id=")}`);
    return response.data;
}

export const createProduct = async (product: Product) => {
    const response = await axios.post<Product>(`http://localhost:3001/products`, product);
    return response.data;
}

export const updateProduct = async (product: Product) => {
    const response = await axios.put<Product>(`http://localhost:3001/products/${product.id}`, product);
    return response.data;
}

export const deleteProduct = async (id: number) => {
    const response = await axios.delete<Product>(`http://localhost:3001/products/${id}`);
    return response.data;
}

export const getStoredProductOnShelf = async (shelfId: number) => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts?shelfId=${shelfId}`);
    return response.data;
}

export const getStoredProductsOnShelfs = async (shelfs: number[]) => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts?shelfId=${shelfs.map(shelf => shelf).join("&shelfid=")}`);
    return response.data;
}

export const getStoredProductsFromProducts = async (products: number[]) => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts?productId=${products.map(product => product).join("&productId=")}`);
    return response.data;
}

export const getStoredProductsFromProduct = async (product: number) => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts?productId=${product}`);
    return response.data;
}

export const getStoredProducts = async () => {
    const response = await axios.get<ShelfProduct[]>(`http://localhost:3001/shelfproducts`);
    return response.data;
}