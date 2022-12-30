import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export default async function newEstate (estate) {
    
    try {
        const response = await axios.post(`${url}/api/newestate`, estate, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
