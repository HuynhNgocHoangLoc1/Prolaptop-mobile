import axiosClient from "./axiosClient";

const userAPI = {
    updateUser: async (id, data) => {
        const url = `/user/${id}`;
        return await axiosClient.application.patch(url, data);
    },
    
    async updateAvatar(avatar, id) {
        const url = `/user/${id}`;
    
        const formData = new FormData();
        formData.append("avatar", {  // Chỉnh sửa tên trường thành 'avatar'
            uri: avatar,
            type: avatar.endsWith('.png') ? 'image/png' : 'image/jpeg',  // Kiểm tra kiểu ảnh
            name: 'avatar.jpg', // Tên tệp có thể được chỉnh sửa
        });
    
        try {
            const response = await axiosClient.formData.patch(url, formData);
            return response.data; // Lưu trữ phản hồi nếu cần
        } catch (error) {
            console.error("Error uploading avatar:", error.response ? error.response.data : error.message);
            throw error; // Ném lại lỗi nếu cần
        }
    }
    
};

export default userAPI;
