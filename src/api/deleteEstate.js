import axios from 'axios';

export default async function deleteEstate(id) {
    const url = process.env.REACT_APP_API_URL;
    
    try {
        const response = await axios.delete(`${url}/api/deleteEstate/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}
