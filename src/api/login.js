import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export function login(usernameEmail, password) {
    return axios.post(`${url}/api/login`, { usernameEmail, password })
        .then(res => res.data)
        .catch((error) => {
            console.log(error);
          });
}