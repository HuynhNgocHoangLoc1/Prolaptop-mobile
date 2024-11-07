import axiosClient from "./axiosClient";

const messagesApi = {
    sendMessage: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getMessages: async (id) => {
        const url = `/messages/${id}/0d9ac0ad-a385-48da-9c2e-f80d16602625`;
        return await axiosClient.application.get(url);
    },
};
export default messagesApi