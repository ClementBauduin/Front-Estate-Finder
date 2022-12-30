import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export default async function getUserEstate(username) {
    try {
        const response = await axios.get(`${url}/api/userestates/${username}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
