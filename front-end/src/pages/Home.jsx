import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Hero,
  ProductFilter,
  ProductSkeleton,
  WellnessHomepage,
} from "../components/home";
import WatchlistService from "../services/api/WatchlistService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [favoriteProducts, setFavoriteProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState?.isAuthenticated || false;
  const user = authState?.user || null;
  const token = authState?.token || null;

  const API_BASE_URL = (
    process.env.REACT_APP_API_URL || "http://localhost:9999"
  ).trim();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentStatus = query.get("paymentStatus");

    if (paymentStatus === "paid") {
      toast.success("Payment successful!");
      navigate("/", { replace: true });
    } else if (paymentStatus === "failed") {
      toast.error("Payment failed!");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(response.data.data || []);
    } catch (error) {
      toast.error("Error loading categories");
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");

      let url = `${API_BASE_URL}/api/products?page=${currentPage}&limit=9`;

      if (searchParam) {
        url += `&search=${encodeURIComponent(searchParam)}`;
      }

      if (selectedCategories.length > 0) {
        const categoryIds = selectedCategories.join(",");
        url += `&categories=${categoryIds}`;
      }

      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;

      if (sortOrder !== "default") {
        const serverSort = sortOrder.replace(/-/g, "_");
        url += `&sort=${serverSort}`;
      }

      const response = await axios.get(url);
      const { data, pagination } = response.data;
      setTotalPages(pagination?.totalPages || 1);

      const formattedProducts = data.map((product) => {
        let imageUrl;
        const img = String(product.image || "").trim();

        if (img.startsWith("http://") || img.startsWith("https://")) {
          imageUrl = img;
        } else if (img) {
          imageUrl = `${API_BASE_URL}/uploads/${img}`;
        } else {
          imageUrl = "https://via.placeholder.com/300?text=No+Image";
        }

        return {
          ...product,
          imageUrl,
          categoryName: product.categoryId?.name || "Uncategorized",
          sellerName: product.sellerId?.username || "Unknown Seller",
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
        };
      });

      setProducts(formattedProducts);
    } catch (error) {
      toast.error("Error loading products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoriesParam = params.get("categories");

    if (categoriesParam) {
      const categoryIds = categoriesParam.split(",").filter((id) => id);
      setSelectedCategories(categoryIds);
    } else {
      setSelectedCategories([]);
    }

    setCurrentPage(1);
  }, [location.search]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, currentPage, minPrice, maxPrice, sortOrder]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, minPrice, maxPrice]);

  // Handlers
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/300?text=No+Image";
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to add products to cart");
      navigate("/signin");
      return;
    }

    const productToAdd = products.find((p) => p._id === productId);

    if (
      user?.role === "seller" &&
      productToAdd &&
      productToAdd.sellerId?._id === user?.id
    ) {
      toast.warning("You cannot add your own products to cart");
      return;
    }

    try {
      setAddingToCart((prev) => ({ ...prev, [productId]: true }));

      const response = await axios.post(
        `${API_BASE_URL}/api/buyers/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleToggleFavorite = async (productId) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to favorite products");
      navigate("/signin");
      return;
    }

    try {
      setFavoriteProducts((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));

      const response = await WatchlistService.toggleWatchlist(productId);

      if (response.isWatching) {
        toast.success("Added to favorites!");
      } else {
        toast.info("Removed from favorites");
      }
    } catch (error) {
      setFavoriteProducts((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites.");
    }
  };

  const handleProductClick = (product) => {
    navigate(`/auth/product/${product._id}`, { state: { item: product } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // Loading state
  if (loading || loadingCategories) {
    return (
      <main className="min-h-screen">
        <Hero />
        <ProductFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          onResetCategories={handleResetCategories}
        />
        <section className="px-4 pb-12 mx-auto md:px-8 md:pb-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            <ProductSkeleton count={5} />
          </div>
        </section>
      </main>
    );
  }

  // Main render
  return (
    <main className="min-h-screen">
      <Hero />

      {/* <ProductFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onResetCategories={handleResetCategories}
      /> */}

      <WellnessHomepage />
      {/* <section className="px-4 pb-12 mx-auto md:px-8 md:pb-8 max-w-7xl">
        {products.length === 0 ? (
          <div className="p-16 text-center rounded-lg bg-gray-50">
            <h3 className="mb-4 text-2xl font-bold text-gray-700">
              No products match your criteria
            </h3>
            <button
              onClick={handleResetCategories}
              className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              View all products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  isFavorite={favoriteProducts[product._id]}
                  isAddingToCart={addingToCart[product._id]}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onProductClick={handleProductClick}
                  onImageError={handleImageError}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section> */}
    </main>
  );
};

export default Home;
