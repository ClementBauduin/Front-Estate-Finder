import axios from "axios";

const url = process.env.REACT_APP_API_URL;
export async function getEstate(id) {
   try {
        const response = await axios.get(`${url}/api/estate/${id}`);
        return response.data;
    } catch (error) {
        const response = error;
        return response;
    }
}

export async function getEstatesByFilter(filter) {
    const { type = undefined, price = undefined, rooms = undefined, size = undefined, zip = undefined } = filter || {};
    
    try {
            const response = await axios.get(`${url}/api/estates`,{params: {type,price,rooms,size,zip}});
            return response.data;
    } catch (error) {
            const response = error;
            return response;
    }
}

