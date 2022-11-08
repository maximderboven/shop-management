import axios from "axios";
import {Product} from "../model/Product";
import { ProductProperty } from "../model/ProductProperty";
import { Property } from "../model/Property";
import { Shelf } from "../model/Shelf";
import { ShelfProduct } from "../model/ShelfProduct";

export const getProperties = async () => {
    const response = await axios.get<Property[]>(`http://localhost:3001/properties/`);
    return response.data;
}

export const getProductProperties = async (productId: string) => {
    const response = await axios.get<ProductProperty[]>(`http://localhost:3001/productproperties?productId=${productId}`);
    return response.data;
}

export const createProductProperty = async (productProperty: Omit<ProductProperty, "id">) => {
    const response = await axios.post<ProductProperty>(`http://localhost:3001/productproperties`, productProperty);
    return response.data;
}

export const deleteProductProperty = async (id: number) => {
    const response = await axios.delete<ProductProperty>(`http://localhost:3001/productproperties/${id}`);
    return response.data;
}