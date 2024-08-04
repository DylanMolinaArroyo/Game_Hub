import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        
        key: '93420dd3eb104d4b8b325b4f8cd0e730'
    }
}) 

