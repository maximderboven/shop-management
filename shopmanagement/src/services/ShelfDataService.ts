import axios from "axios";
import {Shelf} from "../model/Shelf";

export const getShelfs = async () => {
    const response = await axios.get<Shelf[]>('http://localhost:3001/shelfs');
    return response.data;
}

export const getShelfsFromDepartment = async (departmentId: string) => {
    const response = await axios.get<Shelf[]>(`http://localhost:3001/shelfs?departmentId=${departmentId}`);
    return response.data;
}

export const getShelfsFromDepartments = async (departments: number[]) => {
    const response = await axios.get<Shelf[]>(`http://localhost:3001/shelfs?departmentId=${departments.join("&departmentId=")}`);
    return response.data;
}

export const getShelf = async (id: number) => {
    const response = await axios.get<Shelf>(`http://localhost:3001/shelfs/${id}`);
    return response.data;
}





export const createShelf = async (shelf: Shelf) => {
    const response = await axios.post<Shelf>(`http://localhost:3001/shelfs`, shelf);
    return response.data;
}

export const updateShelf = async (shelf: Shelf) => {
    const response = await axios.put<Shelf>(`http://localhost:3001/shelfs/${shelf.id}`, shelf);
    return response.data;
}

export const deleteShelf = async (id: number) => {
    const response = await axios.delete<Shelf>(`http://localhost:3001/shelfs/${id}`);
    return response.data;
}