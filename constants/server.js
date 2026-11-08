import { SERVER_URL as ENV_SERVER_URL } from '@env';

// SERVER_URL trong .env là URL của API, ví dụ http://localhost:5003/api
export const API_URL = (ENV_SERVER_URL || 'http://localhost:5003/api').replace(/\/+$/, '');
// Socket kết nối tới gốc server (bỏ hậu tố /api)
export const SOCKET_URL = API_URL.replace(/\/api$/, '');
