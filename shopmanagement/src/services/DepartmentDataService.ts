import axios from "axios";
import { Department } from "../model/Department";

export const getDepartments = async () => {
    const response = await axios.get<Department[]>('http://localhost:3001/departments');
    return response.data;
}

export const getDepartment = async (id: string) => {
    const response = await axios.get<Department>(`http://localhost:3001/departments/${id}`);
    return response.data;
}