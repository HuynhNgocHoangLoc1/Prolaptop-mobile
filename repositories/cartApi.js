import axiosClient from "./axiosClient";

const cartAPI = {
    getAllCart: async (account) => {
        const url = `/user/${account.id}/carts`; // Correct URL
        return await axiosClient.applicationNoAuth.get(url); 
    },

    deleteProductOnCart: async (id) => {
        const url = `/cart/${id}`;
        return await axiosClient.applicationNoAuth.delete(url);
    },

    addProductToCart: async (addToNewCart) => {
        const url = "/cart";
        return await axiosClient.applicationNoAuth.post(url, addToNewCart);
    },
    updateProductQuantity: async (id, data) => {
        const url = `/cart/${id}`; 
        return await axiosClient.applicationNoAuth.patch(url, data); 
    },
}
 export default cartAPI;