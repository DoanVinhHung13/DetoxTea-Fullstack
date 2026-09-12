import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchCart } from "./features/cart/cartSlice";
import OverviewA from "./pages/DashboardAdmin/Overview/Overview";
import ManageDispute from "./pages/DashboardSeller/ManageDispute/ManageDispute";
import ManageOrder from "./pages/DashboardSeller/ManageOrder/ManageOrderHistory";
import ManageInventory from "./pages/DashboardSeller/ManageProduct/ManageInventory";
import ManageProduct from "./pages/DashboardSeller/ManageProduct/ManageProduct";
import ProductDetail from "./pages/DashboardSeller/ManageProduct/ProductDetail";
import ManagerDashboardSellerLaydout from "./pages/DashboardSeller/ManagerDashboardSellerLaydout";
import ManageReturnRequest from "./pages/DashboardSeller/ManageReturnRequest/ManageReturnRequest";
import ManageShipping from "./pages/DashboardSeller/ManageShipping/ManageShipping";
import ManageStoreProfile from "./pages/DashboardSeller/ManageStoreProfile/ManageStoreProfile";
import Overview from "./pages/DashboardSeller/Overview/Overview";
import OTPVerification from "./pages/OTPVerification"; // import component OTP

import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./pages/ErrorPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignIn from "./pages/SignIn.jsx";

import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home.jsx";

import Address from "./pages/Address/Address";
import Chat from "./pages/Chat/Chat"; // Import the Chat component
import Checkout from "./pages/Checkout/Checkout";
import CreateDisputeForm from "./pages/Disputes/CreateDisputeForm";
import MyDisputes from "./pages/Disputes/MyDisputes";
import MyReviews from "./pages/MyReviews/MyReviews";
import OrderDetail from "./pages/OrderHistory/OrderDetail";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Payment from "./pages/Payment/Payment";
import PaymentResult from "./pages/PaymentResult/PaymentResult";
import AuthProductDetail from "./pages/ProductDetail/AuthProductDetail";
import Profile from "./pages/Profile/Profile"; // Import the Profile component
import ReturnRequestsList from "./pages/ReturnRequests/ReturnRequestsList";
import WriteReview from "./pages/Review/WriteReview";
import SignUp from "./pages/SignUp";
import StoreRegistration from "./pages/StoreRegistration";

import { ToastContainer } from "react-toastify";
import Watchlist from "./components/home/Header/Watchlist.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import AuthCallback from "./pages/AuthCallback";
import ManagePayment from "./pages/DashboardAdmin/ManagePayment/ManagePayment";
import ManageProductA from "./pages/DashboardAdmin/ManageProduct/ManageProduct";
import ManageOrderA from "./pages/DashboardAdmin/ManageOrder/ManageOrder";
import AdminDashboardLayout from "./pages/DashboardAdmin/ManagerDashboardAdminLaydout";
import ManageStore from "./pages/DashboardAdmin/ManageShop/ManageStore";
import ManageUser from "./pages/DashboardAdmin/ManageUser/ManageUser";
import ManageVoucher from "./pages/DashboardAdmin/ManageVoucher/ManageVoucher";
import ManageReturnRequestA from "./pages/DashboardAdmin/ManageReturnRequest/ManageReturnRequest";
import News from "./pages/News/News.jsx";
import ProductList from "./pages/ProductList/ProductList.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overscroll-none">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <main className="flex-grow min-h-[60vh] ">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const HomeWithToast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ScrollRestoration />
      <Home />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<HomeWithToast />}></Route>

      {/* Annoymus route */}
      <Route path="/" element={<Layout />}>
        <Route path="/news/:slug" element={<News />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/address" element={<Address />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/payment-result" element={<PaymentResult />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="/order-history" element={<OrderHistory />}></Route>
        <Route path="/order-details/:id" element={<OrderDetail />}></Route>
        <Route path="/my-reviews" element={<MyReviews />}></Route>
        <Route
          path="/write-review/:productId"
          element={<WriteReview />}
        ></Route>
        <Route
          path="/auth/product/:productId"
          element={<AuthProductDetail />}
        ></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/disputes" element={<MyDisputes />}></Route>
        <Route
          path="/create-dispute/:orderItemId"
          element={<CreateDisputeForm />}
        ></Route>
        <Route path="/return-requests" element={<ReturnRequestsList />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/verify-otp" element={<OTPVerification />}></Route>{" "}
        <Route path="/watchlist" element={<Watchlist />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/auth/callback" element={<AuthCallback />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/store-registration"
          element={<StoreRegistration />}
        ></Route>
      </Route>
      {/* Seller route */}
      <Route
        path="/"
        element={<ManagerDashboardSellerLaydout />}
        errorElement={<ErrorPage />}
      >
        <Route path="overview" element={<Overview />}></Route>
        <Route path="manage-product" element={<ManageProduct />}></Route>
        <Route path="manage-inventory" element={<ManageInventory />} />
        <Route path="manage-store" element={<ManageStoreProfile />}></Route>
        <Route
          path="product/:id"
          element={<ProductDetail />}
          errorElement={<ErrorPage />}
        />
        <Route path="manage-order" element={<ManageOrder />}></Route>
        <Route path="manage-shipping" element={<ManageShipping />}></Route>
        <Route path="manage-dispute" element={<ManageDispute />} />
        <Route path="manage-return-request" element={<ManageReturnRequest />} />
      </Route>
      {/* Admin route */}
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route path="/admin" element={<OverviewA />}></Route>
        <Route
          path="/admin/manage-products"
          element={<ManageProductA />}
        ></Route>
        <Route path="/admin/manage-users" element={<ManageUser />}></Route>
        <Route path="/admin/manage-stores" element={<ManageStore />}></Route>
        <Route
          path="/admin/manage-vouchers"
          element={<ManageVoucher />}
        ></Route>
        <Route
          path="/admin/manage-payments"
          element={<ManagePayment />}
        ></Route>
        <Route
          path="/admin/manage-orders"
          element={<ManageOrderA />}
        ></Route>
        <Route
          path="/admin/manage-returns"
          element={<ManageReturnRequestA />}
        ></Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
