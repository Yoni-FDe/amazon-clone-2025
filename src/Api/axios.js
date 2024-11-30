// This is for backend URL 
import axios from "axios";
const  axiosInstance = axios.create({
    // lOCAL INSTANCE OF FIREBASE FUNCTION
    baseURL:"http://127.0.0.1:5001/clone-y2024/us-central1/api" 

    // DEPLOY VERSION OF FIREBASE FUNCTION
    // baseURL: "https://api-xe2rslmttq-uc.a.run.app",

    // DEPLOYED VERSION OF AMAZON API SERVER ON RENDER.COM
    // baseURL: "https://amazon-api-deploy-8m9f.onrender.com"
});

export default {axiosInstance}
