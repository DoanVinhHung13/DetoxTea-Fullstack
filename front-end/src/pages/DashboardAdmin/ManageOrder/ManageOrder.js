import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Select, 
  Tag, 
  Space, 
  message, 
  Card, 
  Row, 
  Col, 
  Typography,
  Divider,
  Tooltip,
  Input
} from 'antd';
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  EditOutlined,
  ReloadOutlined,
  UserOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { formatCurrency } from '../../../utils/constants';
import AdminOrderService from '../../../services/api/AdminOrderService';
import { useOutletContext } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const ManageOrder = () => {
  const { handleSetDashboardTitle } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (handleSetDashboardTitle) {
      handleSetDashboardTitle("Manage Orders");
    }
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async (page = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pagination.pageSize,
      };
      if (status) params.status = status;
      
      const response = await AdminOrderService.getAllOrders(params);
      
      if (response.success) {
        setOrders(response.data || []);
        setPagination({
          ...pagination,
          current: response.pagination?.page || 1,
          total: response.pagination?.total || 0
        });
      } else {
        message.error(response.message || 'Lỗi khi tải danh sách đơn hàng');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Lỗi khi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;

    try {
      const response = await AdminOrderService.updateOrderStatus(selectedOrder._id, newStatus);
      if (response.success) {
        message.success('Cập nhật trạng thái thành công');
        setStatusModalVisible(false);
        fetchOrders(pagination.current);
        
        // Cập nhật lại selectedOrder nếu đang mở modal chi tiết
        if (detailModalVisible) {
          const detailResponse = await AdminOrderService.getOrderDetails(selectedOrder._id);
          if (detailResponse.success) {
            setSelectedOrder(detailResponse.data);
          }
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const showDetailModal = async (record) => {
    setLoading(true);
    try {
      const response = await AdminOrderService.getOrderDetails(record._id);
      if (response.success) {
        setSelectedOrder(response.data);
        setDetailModalVisible(true);
      }
    } catch (error) {
      message.error('Lỗi khi tải chi tiết đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'shipping': return 'purple';
      case 'shipped': return 'green';
      case 'failed to ship': return 'red';
      case 'rejected': return 'volcano';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang đóng gói';
      case 'shipping': return 'Đang giao hàng';
      case 'shipped': return 'Đã giao hàng';
      case 'failed to ship': return 'Giao hàng lỗi';
      case 'rejected': return 'Đã hủy';
      default: return status;
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (id) => (
        <Text code style={{ fontSize: '12px' }}>
          {id.slice(-8).toUpperCase()}
        </Text>
      ),
    },
    {
      title: 'Người mua',
      dataIndex: 'buyerId',
      key: 'buyerId',
      render: (buyer) => (
        <div>
          <div><UserOutlined /> {buyer?.fullname || buyer?.username}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {buyer?.email}
          </Text>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => (
        <Text strong style={{ color: '#1890ff' }}>
          {formatCurrency(price)}
        </Text>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status).toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => showDetailModal(record)}
            />
          </Tooltip>
          <Tooltip title="Cập nhật trạng thái">
            <Button
              type="default"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setSelectedOrder(record);
                setNewStatus(record.status);
                setStatusModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '8px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            <ShoppingCartOutlined /> Quản lý đơn hàng
          </Title>
          <Text type="secondary">
            Xem và cập nhật trạng thái các đơn hàng trong hệ thống
          </Text>
        </Col>
        <Col>
          <Space>
            <Input 
              placeholder="Tìm theo ID..." 
              prefix={<SearchOutlined />} 
              style={{ width: 200 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Lọc theo trạng thái"
              allowClear
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 180 }}
            >
              <Option value="pending">Chờ xử lý</Option>
              <Option value="processing">Đang đóng gói</Option>
              <Option value="shipping">Đang giao hàng</Option>
              <Option value="shipped">Đã giao hàng</Option>
              <Option value="failed to ship">Giao hàng lỗi</Option>
              <Option value="rejected">Đã hủy</Option>
            </Select>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchOrders(pagination.current)}
              loading={loading}
            >
              Làm mới
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} đơn hàng`,
          onChange: (page, pageSize) => {
            setPagination(prev => ({ ...prev, current: page, pageSize }));
            fetchOrders(page);
          },
        }}
      />

      {/* Order Detail Modal */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?._id?.slice(-6).toUpperCase()}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button 
            key="status" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setStatusModalVisible(true)}
          >
            Cập nhật trạng thái
          </Button>
        ]}
        width={850}
      >
        {selectedOrder && (
          <div>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Divider orientation="left">Thông tin chung</Divider>
                <div style={{ padding: '0 12px' }}>
                  <p><strong>Mã đầy đủ:</strong> {selectedOrder._id}</p>
                  <p><strong>Người mua:</strong> {selectedOrder.buyerId?.fullname || selectedOrder.buyerId?.username}</p>
                  <p><strong>Email:</strong> {selectedOrder.buyerId?.email}</p>
                  <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</p>
                  <p><strong>Tổng tiền:</strong> <Text type="danger" strong size="large">{formatCurrency(selectedOrder.totalPrice)}</Text></p>
                  <p>
                    <strong>Trạng thái: </strong> 
                    <Tag color={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status).toUpperCase()}
                    </Tag>
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <Divider orientation="left">Địa chỉ nhận hàng</Divider>
                {selectedOrder.addressId ? (
                  <div style={{ padding: '0 12px' }}>
                    <p><strong>Người nhận:</strong> {selectedOrder.addressId.fullName}</p>
                    <p><strong>SĐT:</strong> {selectedOrder.addressId.phoneNumber}</p>
                    <p><strong>Địa chỉ:</strong> {selectedOrder.addressId.address}</p>
                    <p><strong>Khu vực:</strong> {selectedOrder.addressId.ward}, {selectedOrder.addressId.district}, {selectedOrder.addressId.city}</p>
                  </div>
                ) : (
                  <Text type="secondary">Không có thông tin địa chỉ</Text>
                )}
              </Col>
            </Row>

            <Divider orientation="left">Danh sách sản phẩm</Divider>
            <Table
              dataSource={selectedOrder.orderItems}
              pagination={false}
              rowKey="_id"
              size="small"
              columns={[
                {
                  title: 'Sản phẩm',
                  key: 'product',
                  render: (_, item) => (
                    <Space>
                      <img 
                        src={item.productId?.image || 'https://via.placeholder.com/50'} 
                        alt="" 
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.productId?.title}</div>
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          Seller: {item.productId?.sellerId?.username}
                        </Text>
                      </div>
                    </Space>
                  )
                },
                {
                  title: 'Đơn giá',
                  dataIndex: 'unitPrice',
                  key: 'unitPrice',
                  render: (price) => formatCurrency(price)
                },
                {
                  title: 'Số lượng',
                  dataIndex: 'quantity',
                  key: 'quantity'
                },
                {
                  title: 'Thành tiền',
                  key: 'subtotal',
                  align: 'right',
                  render: (_, item) => <Text strong>{formatCurrency(item.unitPrice * item.quantity)}</Text>
                }
              ]}
            />
          </div>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal
        title="Cập nhật trạng thái đơn hàng"
        open={statusModalVisible}
        onOk={handleUpdateStatus}
        onCancel={() => setStatusModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
        width={400}
      >
        <div style={{ padding: '10px 0' }}>
          <Text strong>Chọn trạng thái mới cho đơn hàng:</Text>
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: '100%', marginTop: '12px' }}
          >
            <Option value="pending">Chờ xử lý (Pending)</Option>
            <Option value="processing">Đang đóng gói (Processing)</Option>
            <Option value="shipping">Đang giao hàng (Shipping)</Option>
            <Option value="shipped">Đã giao hàng (Shipped)</Option>
            <Option value="failed to ship">Giao hàng lỗi (Failed to ship)</Option>
            <Option value="rejected">Đã hủy/Từ chối (Rejected)</Option>
          </Select>
          <div style={{ marginTop: '15px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              * Lưu ý: Việc cập nhật trạng thái ở đây sẽ áp dụng cho toàn bộ đơn hàng và tất cả sản phẩm đi kèm.
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageOrder;
