import axiosClient from "./axiosClient";

const productAPI = {
    getAllProduct: async (params) => {
        const url = "/product";
        return await axiosClient.applicationNoAuth.get(url, { params }); // Truyền params vào query
      },
    getProductByCategoryId: async (categoryId) => {
        const url = `/product/${categoryId}/categoryId`;
        return await axiosClient.applicationNoAuth.get(url);
    }
}
 export default productAPI;