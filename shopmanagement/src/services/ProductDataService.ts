import axios from "axios";
import {Product} from "../model/Product";

export const getProducts = async () => {
    const response = await axios.get<Product[]>('http://localhost:3001/products');
    return response.data;
}

export const getProduct = async (id: number) => {
    const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
    return response.data;
}