import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export default async function editEstate(id,editedEstate) {
    
    try {
        const response = await axios.patch(`${url}/api/editEstate/${id}`,editedEstate)
        return (response.data);
    } catch (error) {
        console.error(error);
    }
}
