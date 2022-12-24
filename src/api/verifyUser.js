import axios from "axios"

const url = process.env.REACT_APP_API_URL;

export function verifyUser (confirmationCode) {
    axios.get(`${url}/api/confirm/?${confirmationCode}`).then((res) => {
        return res.data;
    })
}