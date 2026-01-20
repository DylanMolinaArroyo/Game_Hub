import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        
        key: '78e8a702df4d45539928cc5cd7a73034'
    }
}) 

