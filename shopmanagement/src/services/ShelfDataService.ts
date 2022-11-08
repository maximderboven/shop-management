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