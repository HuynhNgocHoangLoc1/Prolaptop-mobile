import axiosClient from "./axiosClient";

const zaloPayAPI = {
  // Hàm tạo thanh toán ZaloPay
  createZaloPayment: async (paymentData) => {
    const url = `/payment/zalo/payment`;
    try {
      const response = await axiosClient.application.post(url, paymentData);
      return response;
    } catch (error) {
      console.error('Error creating Zalo payment:', error);
      throw error;
    }
  },

  // Hàm kiểm tra trạng thái thanh toán ZaloPay
  checkOrderStatus: async (appTransId) => {
    const url = `/payment/zalo/order-status/${appTransId}`;
    try {
      const response = await axiosClient.application.get(url);
      return response;
    } catch (error) {
      console.error('Error checking ZaloPay order status:', error);
      throw error;
    }
  }
};

export default zaloPayAPI;