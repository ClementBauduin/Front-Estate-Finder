import axios from "axios"

const url = process.env.REACT_APP_API_URL;

export function logout () {
    axios.get(`${url}/api/logout`)
    
}