import axios from "axios";
import {Product} from "../model/Product";

export const getProducts = async () => {
    const response = await axios.get<Product[]>('http://localhost:3001/products');
    return response.data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
    return response.data;
}


export const addProduct = (product: Omit<Product, "id">) => { // id is supplied by the backend
    return axios.post('/products', product)
};

export const editProduct = (product: Omit<Product,number>) => {
    return axios.put('/products', product)
};

export const removeProduct = (id: string) => {
    return axios.delete<Product>(`http://localhost:3001/products/${id}`);
};