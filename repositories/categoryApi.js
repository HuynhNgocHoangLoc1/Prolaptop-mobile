import axiosClient from "./axiosClient";

const categoryAPI = {
    getAllCategory: async () => {
        const url = "/category";
        return await axiosClient.applicationNoAuth.get(url);
    }
}
 export default categoryAPI;