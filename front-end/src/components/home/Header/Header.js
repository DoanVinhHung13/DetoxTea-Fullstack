import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { resetUserInfo, setUserInfo } from "../../../redux/orebiSlice";

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
  const [scrolled, setScrolled] = useState(false);

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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Top Bar */}

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg- bg-[#f9f5e9] transition-all duration-300 ${
          scrolled ? "shadow-lg" : "border-b-2 border-stone-300"
        }`}
      >
        <div className="px-4 py-2 mx-auto max-w-7xl md:px-8">
          <div className="flex items-center justify-between gap-6">
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
              className="flex-shrink-0 group"
            >
              <h1 className="font-serif text-2xl font-bold text-transparent transition-all duration-300 bg-black bg-clip-text group-hover:scale-105">
                DETOX TEA
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="items-center hidden gap-8 lg:flex">
              <Link
                to="/"
                className="relative font-medium text-md text-stone-700 hover:text-stone-900 group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/products"
                className="relative font-medium text-md text-stone-700 hover:text-stone-900 group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about-us"
                className="relative font-medium text-md text-stone-700 hover:text-stone-900 group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Search Bar - Desktop */}

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              {isAuthenticated && (
                <Link
                  to="/watchlist"
                  className="relative hidden p-2 transition-all duration-300 rounded-full lg:block text-stone-700 hover:bg-stone-100 hover:text-red-500 group"
                >
                  <Heart className="w-5 h-5 transition-all duration-300 group-hover:fill-red-500" />
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 transition-all duration-300 rounded-full text-stone-700 hover:bg-stone-100 hover:text-amber-600 group"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-gradient-to-r from-amber-500 to-orange-500 -top-1 -right-1"
                  >
                    {cartTotalCount}
                  </motion.span>
                )}
              </Link>

              {/* Notifications */}
              {/* {isAuthenticated && (
                <button className="relative hidden p-2 transition-all duration-300 rounded-full lg:block text-stone-700 hover:bg-stone-100 hover:text-amber-600">
                  <Bell className="w-5 h-5" />
                  {chatNotifications > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              )} */}

              {/* User Menu */}
              <div ref={ref} className="relative">
                <button
                  onClick={() => setShowUser(!showUser)}
                  className="flex items-center gap-2 p-2 transition-all duration-300 rounded-full text-stone-700 hover:bg-stone-100"
                >
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-[#228B22]">
                    {isAuthenticated ? (
                      userName?.[0]?.toUpperCase() ||
                      user?.username?.[0]?.toUpperCase() ||
                      "U"
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 hidden lg:block ${showUser ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showUser && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 w-64 mt-3 overflow-hidden bg-white border-2 shadow-2xl border-stone-200 rounded-xl top-full"
                    >
                      {isAuthenticated ? (
                        <div className="">
                          <div className="px-4 py-4 bg-white border-b">
                            <p className="text-sm font-bold text-stone-900">
                              {userName || user?.username}
                            </p>
                          </div>

                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setShowUser(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors text-stone-700 hover:bg-stone-50"
                            >
                              <User className="w-4 h-4" />
                              My Profile
                            </Link>
                            <Link
                              to="/order-history"
                              onClick={() => setShowUser(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors text-stone-700 hover:bg-stone-50"
                            >
                              <Package className="w-4 h-4" />
                              Order History
                            </Link>
                            <Link
                              to="/watchlist"
                              onClick={() => setShowUser(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors text-stone-700 hover:bg-stone-50 lg:hidden"
                            >
                              <Heart className="w-4 h-4" />
                              Watchlist
                            </Link>
                            <Link
                              to="/my-reviews"
                              onClick={() => setShowUser(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors text-stone-700 hover:bg-stone-50"
                            >
                              <Star className="w-4 h-4" />
                              My Reviews
                            </Link>
                          </div>

                          <div className=" border-stone-200">
                            <button
                              onClick={handleLogout}
                              className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="">
                          <Link
                            to="/signin"
                            onClick={() => setShowUser(false)}
                            className="block px-4 py-3 text-sm font-medium text-center text-white transition-all duration-300 bg-[#228B22] "
                          >
                            Sign in
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setShowUser(false)}
                            className="block px-4 py-3 text-sm text-center transition-colors text-stone-700 hover:bg-stone-50"
                          >
                            Create account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="p-2 transition-all duration-300 rounded-full lg:hidden text-stone-700 hover:bg-stone-100"
                onClick={() => setSidenav(!sidenav)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidenav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidenav(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 w-64 h-full overflow-y-auto bg-white shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-stone-800 to-amber-600 bg-clip-text">
                    Menu
                  </h2>
                  <button
                    onClick={() => setSidenav(false)}
                    className="p-2 transition-colors rounded-full hover:bg-stone-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setSidenav(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-stone-900"
                  >
                    Home
                  </Link>
                  <Link
                    to="/deals"
                    onClick={() => setSidenav(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-stone-900"
                  >
                    Daily Deals
                  </Link>
                  <Link
                    to="/outlet"
                    onClick={() => setSidenav(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-stone-900"
                  >
                    Brand Outlet
                  </Link>
                  <Link
                    to="/help"
                    onClick={() => setSidenav(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-stone-900"
                  >
                    Help & Contact
                  </Link>
                  {isAuthenticated && user?.role === "buyer" && (
                    <button
                      onClick={() => {
                        handleBecomeASeller();
                        setSidenav(false);
                      }}
                      className="flex items-center w-full gap-3 px-4 py-3 text-left transition-all duration-300 rounded-lg text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-stone-900"
                    >
                      Become a Seller
                    </button>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
