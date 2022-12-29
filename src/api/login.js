import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default async function login(usernameEmail, password) {

    try {
        const response = await axios.post(`${url}/api/login`, { usernameEmail, password }, {credentials :"include"});
        return response.data;
    } catch (error) {
        const response = error;
        return response;
    }

}
