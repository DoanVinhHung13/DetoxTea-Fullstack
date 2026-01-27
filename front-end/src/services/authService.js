// src/services/authService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9999/api";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập",
    );
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký",
    );
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/forgot-password`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Đã xảy ra lỗi khi yêu cầu khôi phục mật khẩu",
    );
  }
};
