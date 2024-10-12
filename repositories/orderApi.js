import axiosClient from "./axiosClient";
const orderAPI = {
    createOrderFromCart: async (newOrder) => {
        const url = `/order/create-from-cart`;
        return await axiosClient.application.post(url, newOrder);
    },

    getListOrderByUser: async () => {
        const url = `/order`;
        return await axiosClient.application.get(url);
    }

}
 export default orderAPI;