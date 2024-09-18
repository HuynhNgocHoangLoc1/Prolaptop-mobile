import axiosClient from "./axiosClient";

const cartAPI = {
    getAllCart: async (cart) => {
        const url = "/cart"; 
        return await axiosClient.application.get(cart); 
    }
}
 export default cartAPI;