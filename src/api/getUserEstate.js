import axios from 'axios';

export default async function getUserEstate(username) {
    try {
        const response = await axios.get(`/api/userestates/${username}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}