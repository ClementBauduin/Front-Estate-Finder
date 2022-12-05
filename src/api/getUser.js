import axios from "axios";

const url = "http://localhost:3000";

export default async function getUser() {
    try {
        const response = await axios.get(`${url}/api/whoami`);
        return response.data.user;
    } catch (error) {
        const response = error;
        return response;
    }
}