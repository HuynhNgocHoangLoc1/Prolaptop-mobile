import axiosClient from "./axiosClient";

const authAPI = {
    login: async (credentials) => {
        const url = "/auth/login";
        return await axiosClient.application.post(url, credentials);
    },
    register: async (user) => {
        const url = "/user";
        return await axiosClient.formData.post(url, user);
    },
    product: async (product) => {
        const url = "/product";
        return await axiosClient.application.get(url, product);
    }
  
    
};

export default authAPI;