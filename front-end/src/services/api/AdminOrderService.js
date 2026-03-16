import { api } from '../index';

class AdminOrderService {
  /**
   * Lấy danh sách tất cả đơn hàng (cho Admin)
   * @param {Object} params - Các tham số lọc (status, page, limit)
   */
  static async getAllOrders(params = {}) {
    try {
      const response = await api.get('/admin/orders', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin orders:', error);
      throw error;
    }
  }

  /**
   * Lấy chi tiết một đơn hàng (cho Admin)
   * @param {string} orderId 
   */
  static async getOrderDetails(orderId) {
    try {
      const response = await api.get(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin order details:', error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái đơn hàng (cho Admin)
   * @param {string} orderId 
   * @param {string} status 
   */
  static async updateOrderStatus(orderId, status) {
    try {
      const response = await api.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}

export default AdminOrderService;
