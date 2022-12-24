import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default async function getUser() {
    try {
        const response = await axios.get(`${url}/api/whoami`);
        return response.data.user;
    } catch (error) {
        const response = error;
        return response;
    }
}