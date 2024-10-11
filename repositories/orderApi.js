import axiosClient from "./axiosClient";
const orderAPI = {
    createOrderFromCart: async (newOrder) => {
        const url = `/order/create-from-cart`;
        return await axiosClient.application.post(url, newOrder);
    }
    // getOrderByUser: async () => {
    //     const url = `/order`;
    //     return await axiosClient.applicationNoAuth.get(url);
    // }
}
 export default orderAPI;