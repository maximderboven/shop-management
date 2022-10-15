import axios from "axios";
import {Location} from "../model/Location";

export const getLocations = async () => {
    const response = await axios.get<Location[]>('http://localhost:3001/locations');
    return response.data;
}