import axios from "axios";
import {Product} from "../model/Product";
import { ProductProperties } from "../model/ProductProperties";
import { Property } from "../model/Property";
import { Shelf } from "../model/Shelf";
import { ShelfProduct } from "../model/ShelfProduct";

export const getProperties = async () => {
    const response = await axios.get<Property[]>(`http://localhost:3001/properties/`);
    return response.data;
}

export const getProductProperties = async (productId: string) => {
    const response = await axios.get<ProductProperties[]>(`http://localhost:3001/productproperties?productId=${productId}`);
    return response.data;
}