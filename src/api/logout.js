import axios from "axios"

const url = process.env.REACT_APP_API_URL;

export default async function logout () {

    try {
        const response = await axios.get(`${url}/api/logout`, {withCredentials :"include"});
        return response.data;
    } catch (error) {
        const response = error;
        return error;
    }
}
