import axios from "axios"

const url = "http://localhost:3000"

export function logout () {
    axios.get(`${url}/api/logout`)
    
}