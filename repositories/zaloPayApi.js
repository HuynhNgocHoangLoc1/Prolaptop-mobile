import axiosClient from "./axiosClient";

const zaloPayAPI = {
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