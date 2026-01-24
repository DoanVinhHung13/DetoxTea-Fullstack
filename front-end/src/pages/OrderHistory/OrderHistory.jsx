import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrderHistory } from "../../features/order/orderSlice";
import { fetchUserReviews } from "../../features/review/reviewSlice";
import { checkPaymentStatus } from "../../features/payment/paymentSlice";
import { FaSpinner, FaChevronDown, FaBox, FaClock, FaShippingFast, FaCheck, FaStar, FaShoppingBag, FaFilter, FaSearch, FaMoneyBill, FaCreditCard } from "react-icons/fa";
import Pagination from "../../components/common/Pagination";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, pagination, loading } = useSelector((state) => state.order);
  const { userReviews } = useSelector((state) => state.review);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [checkingPayment, setCheckingPayment] = useState({});
  const [reviewedProducts, setReviewedProducts] = useState(new Set());

  useEffect(() => {
    dispatch(fetchOrderHistory({ page: currentPage, limit: 10, status: statusFilter }));
    dispatch(fetchUserReviews({ page: 1, limit: 100 }));
  }, [dispatch, currentPage, statusFilter]);

  useEffect(() => {
    if (orders?.length > 0) {
      orders.forEach(order => {
        if (!paymentStatuses[order._id] && !checkingPayment[order._id]) {
          setCheckingPayment(prev => ({ ...prev, [order._id]: true }));
          dispatch(checkPaymentStatus(order._id))
            .then(action => {
              if (checkPaymentStatus.fulfilled.match(action)) {
                const data = action.payload;
                setPaymentStatuses(prev => ({ ...prev, [order._id]: data?.payment?.status || null }));
                setPaymentMethods(prev => ({ ...prev, [order._id]: data?.payment?.method || null }));
              }
            })
            .finally(() => {
              setCheckingPayment(prev => ({ ...prev, [order._id]: false }));
            });
        }
      });
    }
  }, [dispatch, orders, paymentStatuses, checkingPayment]);

  useEffect(() => {
    if (userReviews?.length > 0) {
      const reviewedProductIds = new Set(
        userReviews
          .filter(review => !review.parentId)
          .map(review => review.productId?._id || review.productId)
          .filter(Boolean)
      );
      setReviewedProducts(reviewedProductIds);
    }
  }, [userReviews]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };
  const toggleOrderExpansion = (orderId) => setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));

  const handleProceedToPayment = (orderId) => {
    toast.info("Redirecting to payment page...");
    navigate('/payment', { state: { orderId, preferredMethod: 'PayOS', directPayment: true, replaceExisting: true } });
  };

  const shouldShowPaymentButton = (orderId) => {
    if (checkingPayment[orderId] || paymentMethods[orderId] === 'COD' || paymentStatuses[orderId] === 'paid') {
      return false;
    }
    return !paymentStatuses[orderId] || paymentStatuses[orderId] === 'failed';
  };

  const formatOrderDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-soft-gold/10 text-soft-gold border-soft-gold/20';
      case 'shipping': return 'bg-sage-green/20 text-forest-green border-sage-green/30';
      case 'shipped': return 'bg-forest-green/10 text-forest-green border-forest-green/20';
      case 'failed to ship':
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-black/5 text-charcoal/80 border-black/10';
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-forest-green/10 text-forest-green border-forest-green/20';
      case 'pending': return 'bg-soft-gold/10 text-soft-gold border-soft-gold/20';
      case 'failed': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-black/5 text-charcoal/80 border-black/10';
    }
  };
  
  const getStatusIcon = (status) => {
    const icons = { pending: FaClock, shipping: FaShippingFast, shipped: FaCheck };
    const Icon = icons[status];
    return Icon ? <Icon className="mr-1" /> : <span className="mr-1">×</span>;
  };
  
  const getPaymentStatusIcon = (status) => {
    const icons = { paid: FaCheck, pending: FaClock };
    const Icon = icons[status];
    return Icon ? <Icon className="mr-1" /> : status === 'failed' ? <span className="mr-1">×</span> : <FaMoneyBill className="mr-1" />;
  };

  const getPaymentMethodText = (method) => ({ COD: 'Cash on Delivery', VietQR: 'VietQR', PayOS: 'PayOS' }[method] || 'Not Specified');
  const hasBeenReviewed = (productId) => productId ? reviewedProducts.has(productId) : false;

  return (
    <div className="bg-cream min-h-screen font-bodyFont">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-sage-green/20 p-2.5 rounded-full"><FaShoppingBag className="text-forest-green text-xl" /></div>
            <h1 className="text-2xl md:text-3xl font-bold text-charcoal font-titleFont">My Orders</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative"><input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-black/10 rounded-lg pl-10 pr-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-forest-green bg-white" /><FaSearch className="absolute left-3.5 top-3.5 text-charcoal/50" /></div>
            <div className="relative"><select id="status-filter" value={statusFilter} onChange={handleStatusChange} className="border border-black/10 rounded-lg pl-10 pr-4 py-2.5 w-full appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-forest-green"><option value="">All Orders</option><option value="pending">Pending</option><option value="shipping">Shipping</option><option value="shipped">Shipped</option><option value="failed to ship">Failed to Ship</option><option value="rejected">Rejected</option></select><FaFilter className="absolute left-3.5 top-3.5 text-charcoal/50" /></div>
          </div>
        </motion.div>

        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-forest-green mb-4" /><p className="text-charcoal/80 font-medium">Loading your orders...</p>
          </motion.div>
        ) : orders?.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="space-y-5">
              {orders.map((order, index) => (
                <motion.div key={order._id} className="bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (index % 5) }}>
                  <div className={`flex justify-between items-center p-5 ${expandedOrders[order._id] ? 'bg-forest-green/5 border-b border-forest-green/10' : 'bg-white'}`}>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                      <div><span className="text-xs uppercase tracking-wider text-charcoal/60 block mb-1">Order ID</span><span className="font-mono font-medium text-charcoal">{order._id.slice(-8).toUpperCase()}</span></div>
                      <div><span className="text-xs uppercase tracking-wider text-charcoal/60 block mb-1">Date</span><span className="text-sm text-charcoal">{formatOrderDate(order.orderDate || order.createdAt)}</span></div>
                      <div><span className="text-xs uppercase tracking-wider text-charcoal/60 block mb-1">Total</span><span className="font-medium text-charcoal">${order.totalPrice.toFixed(2)}</span></div>
                      <div><span className="text-xs uppercase tracking-wider text-charcoal/60 block mb-1">Status</span><span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getStatusBadgeColor(order.status)}`}>{getStatusIcon(order.status)}{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></div>
                      <div><span className="text-xs uppercase tracking-wider text-charcoal/60 block mb-1">Payment</span>{checkingPayment[order._id] ? <span className="inline-flex items-center"><FaSpinner className="animate-spin mr-2 text-charcoal/50" /><span className="text-charcoal/50 text-sm">Checking...</span></span> : <div className="flex flex-col gap-1"><span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getPaymentStatusBadgeColor(paymentStatuses[order._id])}`}>{getPaymentStatusIcon(paymentStatuses[order._id])}{paymentStatuses[order._id] || 'Not Paid'}</span>{paymentMethods[order._id] && <span className="text-xs text-charcoal/50">{getPaymentMethodText(paymentMethods[order._id])}</span>}</div>}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {shouldShowPaymentButton(order._id) && <button onClick={() => handleProceedToPayment(order._id)} className="text-cream bg-forest-green hover:bg-forest-green/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><FaCreditCard />Pay Now</button>}
                      <Link to={`/order-details/${order._id}`} className="text-forest-green hover:text-forest-green/80 bg-forest-green/10 hover:bg-forest-green/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium hidden md:block">View Details</Link>
                      <button onClick={() => toggleOrderExpansion(order._id)} className={`text-charcoal/70 hover:text-charcoal p-2 rounded-full hover:bg-black/5 transition-all ${expandedOrders[order._id] ? 'bg-black/5' : ''}`}><FaChevronDown className={`transition-transform ${expandedOrders[order._id] ? 'rotate-180' : ''}`} /></button>
                    </div>
                  </div>
                  {expandedOrders[order._id] && order.items?.length > 0 && (
                    <motion.div className="p-5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <h3 className="font-medium mb-4 flex items-center gap-2 text-charcoal"><FaBox className="text-forest-green" />Order Items</h3>
                      <div className="overflow-x-auto rounded-lg border border-black/10">
                        <table className="min-w-full divide-y divide-gray-200"><thead className="bg-black/5"><tr><th className="px-4 py-3 text-left text-xs font-medium text-charcoal/60 uppercase tracking-wider">Product</th><th className="px-4 py-3 text-left text-xs font-medium text-charcoal/60 uppercase tracking-wider">Price</th><th className="px-4 py-3 text-left text-xs font-medium text-charcoal/60 uppercase tracking-wider">Quantity</th><th className="px-4 py-3 text-left text-xs font-medium text-charcoal/60 uppercase tracking-wider">Status</th><th className="px-4 py-3 text-right text-xs font-medium text-charcoal/60 uppercase tracking-wider">Actions</th></tr></thead>
                          <tbody className="bg-white divide-y divide-black/5">
                            {order.items.map((item, itemIndex) => (
                              <motion.tr key={item._id} className="hover:bg-black/5 transition-colors" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * (itemIndex + 1) }}>
                                <td className="px-4 py-3.5 whitespace-nowrap"><div className="flex items-center">{item.productId?.image ? <div className="flex-shrink-0 h-12 w-12 mr-3"><img src={item.productId.image} alt={item.productId?.title} className="h-12 w-12 object-cover rounded-lg shadow-sm" /></div> : <div className="flex-shrink-0 h-12 w-12 bg-black/5 rounded-lg mr-3 flex items-center justify-center"><FaBox className="text-charcoal/40" /></div>}<span className="text-sm font-medium text-charcoal line-clamp-1">{item.productId?.title || 'Product not available'}</span></div></td>
                                <td className="px-4 py-3.5 whitespace-nowrap"><div className="text-sm font-medium text-charcoal">${item.unitPrice?.toFixed(2)}</div></td>
                                <td className="px-4 py-3.5 whitespace-nowrap"><div className="text-sm font-medium bg-black/5 w-10 h-8 flex items-center justify-center rounded-md">{item.quantity}</div></td>
                                <td className="px-4 py-3.5 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center w-fit ${getStatusBadgeColor(item.status)}`}>{getStatusIcon(item.status)}{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                                <td className="px-4 py-3.5 whitespace-nowrap text-right">{item.status === 'shipped' && item.productId && (reviewedProducts.has(item.productId._id) ? <span className="text-forest-green bg-forest-green/10 px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1"><FaCheck className="text-xs" />Reviewed</span> : <Link to={`/write-review/${item.productId._id}`} className="text-forest-green hover:text-forest-green/80 bg-forest-green/10 hover:bg-forest-green/20 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1"><FaStar className="text-soft-gold text-xs" />Write Review</Link>)}</td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>{shouldShowPaymentButton(order._id) && <button onClick={() => handleProceedToPayment(order._id)} className="text-cream bg-forest-green hover:bg-forest-green/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 md:hidden"><FaCreditCard />Pay Now</button>}</div>
                        <Link to={`/order-details/${order._id}`} className="text-forest-green hover:text-forest-green/80 bg-forest-green/10 hover:bg-forest-green/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium md:hidden flex items-center gap-2">View Complete Details</Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            {pagination && pagination.pages > 1 && <Pagination currentPage={currentPage} totalPages={pagination.pages} onPageChange={handlePageChange} className="mt-6" />}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-xl p-12 text-center shadow-sm max-w-lg mx-auto">
            <div className="bg-forest-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><FaShoppingBag className="text-forest-green text-3xl" /></div>
            <h2 className="text-2xl font-bold text-charcoal font-titleFont mb-4">No Orders Yet</h2>
            <p className="text-charcoal/80 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link to="/" className="bg-forest-green text-cream px-6 py-3 rounded-lg hover:bg-forest-green/90 transition-colors inline-flex items-center gap-2 font-medium"><FaShoppingBag className="text-sm" />Start Shopping</Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
 