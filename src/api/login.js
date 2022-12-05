import axios from "axios";

const url = "http://localhost:3000"

export function login(usernameEmail, password) {
    return axios.post(`${url}/api/login`, { usernameEmail, password })
        .then(res => res.data)
        .catch((error) => {
            console.log(error);
          });
}