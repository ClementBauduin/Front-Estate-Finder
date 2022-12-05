import axios from "axios"

const url = "http://localhost:3000"

export function verifyUser (confirmationCode) {
    axios.get(`${url}/api/confirm/?${confirmationCode}`).then((res) => {
        return res.data;
    })
}