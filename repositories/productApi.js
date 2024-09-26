import axiosClient from "./axiosClient";

const productAPI = {
    getAllProduct: async (product) => {
        const url = "/product";
        return await axiosClient.applicationNoAuth.get(url, product);
    },
    getProductByCategoryId: async (categoryId) => {
        const url = `/product/${categoryId}/categoryId`;
        return await axiosClient.applicationNoAuth.get(url);
    }
}
 export default productAPI;