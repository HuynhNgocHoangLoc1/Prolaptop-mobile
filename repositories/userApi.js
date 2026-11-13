import axiosClient from "./axiosClient";
import { Platform } from "react-native";

const userAPI = {
    updateUser: async (id, data, avatar) => {
        const url = `/user/${id}`;
        if (avatar) {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            const extension = avatar.split("?")[0].split(".").pop()?.toLowerCase();
            const isPng = extension === "png";
            if (Platform.OS === "web") {
                const imageResponse = await fetch(avatar);
                const imageBlob = await imageResponse.blob();
                const fileExtension = imageBlob.type.split("/")[1] || (isPng ? "png" : "jpg");
                formData.append("avatar", imageBlob, `avatar.${fileExtension}`);
            } else {
                formData.append("avatar", {
                    uri: avatar,
                    type: isPng ? "image/png" : "image/jpeg",
                    name: `avatar.${isPng ? "png" : "jpg"}`,
                });
            }
            return axiosClient.formData.patch(url, formData);
        }

        return axiosClient.application.patch(url, data);
    },

    updatePassword: async (id, data) => {
        const url = `/user/${id}/password`;
        return await axiosClient.application.patch(url, data);
    },
    
};

export default userAPI;
