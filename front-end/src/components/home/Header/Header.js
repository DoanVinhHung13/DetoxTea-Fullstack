import axios from "axios";
import { motion } from "framer-motion";
import {
  Heart,
  Menu,
  MessageSquare,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { resetUserInfo, setUserInfo } from "../../../redux/orebiSlice";
import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const [sidenav, setSidenav] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const searchRef = useRef();

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9999";
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const chatState = useSelector((state) => state.chat);
  const chatNotifications =
    chatState?.conversations?.reduce(
      (count, conv) => count + (conv.unreadCount || 0),
      0,
    ) || 0;

  const cartState = useSelector((state) => state.cart) || {};
  const cartItems = cartState.items || [];

  const cartTotalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowUser(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(response.data.fullname || response.data.username);
      dispatch(setUserInfo(response.data));
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
      }
    }
  }, [API_BASE_URL, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, fetchUserData]);

  const fetchSearchResults = useCallback(
    async (query) => {
      if (!query.trim()) {
        setFilteredProducts([]);
        return;
      }

      try {
        const url = `${API_BASE_URL}/api/products?search=${encodeURIComponent(
          query,
        )}&limit=5`;

        const response = await axios.get(url);
        const products = response.data.data || [];

        const formatted = products.map((item) => ({
          _id: item._id,
          image: item.image,
          name: item.title || "Untitled Product",
          price: item.price,
        }));

        setFilteredProducts(formatted);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setFilteredProducts([]);
      }
    },
    [API_BASE_URL],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchSearchResults]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${API_BASE_URL}/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("accessToken");
      dispatch(resetUserInfo());
      dispatch(logout());
      setIsLoggedIn(false);
      setUserName(null);
      setSidenav(false);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("accessToken");
      dispatch(logout());
      setIsLoggedIn(false);
      setUserName(null);
      setSidenav(false);
      navigate("/signin");
    }
  };

  const handleBecomeASeller = () => {
    navigate("/store-registration");
    setSidenav(false);
    setShowUser(false);
  };

  const getProductImage = (item) => {
    if (!item.image) {
      return "https://via.placeholder.com/100?text=No+Image";
    }

    if (item.image.startsWith("http://") || item.image.startsWith("https://")) {
      return item.image;
    } else {
      return `${API_BASE_URL}/uploads/${item.image}`;
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setFilteredProducts([]);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 py-4 mx-auto max-w-7xl md:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              setSearchQuery("");
              setFilteredProducts([]);
              if (location.pathname === "/") {
                window.location.href = "/";
              }
            }}
            className="flex-shrink-0"
          >
            <h1 className="font-serif text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600">
              eBay
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <Link
              to="/"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/deals"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Daily Deals
            </Link>
            <Link
              to="/outlet"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Brand Outlet
            </Link>
            {isAuthenticated && user?.role === "buyer" && (
              <button
                onClick={handleBecomeASeller}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Sell
              </button>
            )}
            <Link
              to="/help"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Help
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div
            ref={searchRef}
            className="relative flex-1 hidden max-w-md md:block"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Search for anything"
                className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute text-gray-500 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery && filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 mt-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl top-full"
              >
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/auth/product/${item._id}`, {
                        state: { item },
                      });
                      setSearchQuery("");
                      setFilteredProducts([]);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 transition-colors cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded">
                      <img
                        src={getProductImage(item)}
                        alt={item.name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/48?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        ${item.price?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/watchlist"
                className="hidden text-gray-700 transition-colors md:block hover:text-blue-600"
              >
                <Heart className="w-5 h-5 hover:fill-blue-600" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative text-gray-700 transition-colors hover:text-blue-600"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-600 rounded-full -top-2 -right-2">
                  {cartTotalCount}
                </span>
              )}
            </Link>

            {isAuthenticated && <NotificationDropdown />}

            {isAuthenticated && (
              <Link
                to="/chat"
                className="relative text-gray-700 transition-colors hover:text-blue-600"
              >
                <MessageSquare className="w-5 h-5" />
                {chatNotifications > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-600 rounded-full -top-2 -right-2">
                    {chatNotifications}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            <div ref={ref} className="relative">
              <button
                onClick={() => setShowUser(!showUser)}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                <User className="w-5 h-5" />
              </button>

              {showUser && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 w-56 mt-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl top-full"
                >
                  {isAuthenticated ? (
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {userName || user?.username}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/order-history"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Order History
                      </Link>
                      <Link
                        to="/return-requests"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Return Requests
                      </Link>
                      <Link
                        to="/my-reviews"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        My Reviews
                      </Link>
                      <div className="mt-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-sm text-left text-red-600 transition-colors hover:bg-gray-50"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Link
                        to="/signin"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setShowUser(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <button className="md:hidden" onClick={() => setSidenav(!sidenav)}>
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {sidenav && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200 md:hidden"
          >
            {/* Mobile Search */}
            <div className="relative mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                    setSidenav(false);
                  }
                }}
                placeholder="Search for anything"
                className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full outline-none focus:border-blue-600"
              />
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            </div>

            <Link
              to="/"
              onClick={() => setSidenav(false)}
              className="py-2 text-left text-gray-700 transition-colors hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/deals"
              onClick={() => setSidenav(false)}
              className="py-2 text-left text-gray-700 transition-colors hover:text-blue-600"
            >
              Daily Deals
            </Link>
            <Link
              to="/outlet"
              onClick={() => setSidenav(false)}
              className="py-2 text-left text-gray-700 transition-colors hover:text-blue-600"
            >
              Brand Outlet
            </Link>
            {isAuthenticated && user?.role === "buyer" && (
              <button
                onClick={() => {
                  handleBecomeASeller();
                  setSidenav(false);
                }}
                className="py-2 text-left text-gray-700 transition-colors hover:text-blue-600"
              >
                Sell
              </button>
            )}
            <Link
              to="/help"
              onClick={() => setSidenav(false)}
              className="py-2 text-left text-gray-700 transition-colors hover:text-blue-600"
            >
              Help
            </Link>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;
