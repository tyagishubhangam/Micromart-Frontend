import axios from './axiosInstance.js';

const API_URL = '/review';

const postReview = async (reviewBody)=> {
    try{
        const resp = await axios.post(`${API_URL}/addReview`,reviewBody);
        console.log(resp.data.data);
    }catch(err){
        throw new Error(err);
    }
}

export{
    postReview
}