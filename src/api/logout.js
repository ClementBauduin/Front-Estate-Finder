import axios from "axios"

const url = process.env.REACT_APP_API_URL;

export function logout () {

    try {
        axios.get(`${url}/api/logout`, {withCredentials :"include"});
    } catch (error) {
        console.log(error)
    }
}
