import axiosClient from "./axiosClient";

const productAPI = {
    getAllProduct: async (product) => {
        const url = "/product";
        return await axiosClient.applicationNoAuth.get(url, product);
    }
}
 export default productAPI;