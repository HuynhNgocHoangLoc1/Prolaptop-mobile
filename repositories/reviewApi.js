import axiosClient from "./axiosClient";

const ReviewApi = {
    reviewProduct: async (reviewData) => {
        const url = "/review";
        return await axiosClient.application.post(url, reviewData);
    },

}

export default ReviewApi