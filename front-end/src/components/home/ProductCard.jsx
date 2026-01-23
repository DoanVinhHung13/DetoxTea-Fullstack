import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  index,
  isFavorite,
  isAddingToCart,
  onAddToCart,
  onToggleFavorite,
  onProductClick,
  onImageError,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md group hover:shadow-xl hover:-translate-y-2"
    >
      {/* Top Rated Badge */}
      {product.rating >= 4.5 && (
        <div className="absolute z-20 flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-lg top-3 left-3">
          <VerifiedIcon style={{ fontSize: 14 }} />
          Top Rated
        </div>
      )}

      {/* Product Image */}
      <div
        className="relative flex items-center justify-center p-4 overflow-hidden cursor-pointer h-60 bg-gray-50"
        onClick={() => onProductClick(product)}
      >
        <img
          src={
            product.imageUrl || "https://via.placeholder.com/300?text=No+Image"
          }
          alt={product.title || "Product Image"}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
          onError={onImageError}
        />

        {/* Action Buttons */}
        <div className="absolute flex flex-col gap-2 top-3 right-3">
          <button
            className="p-2 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            title="View Details"
          >
            <VisibilityIcon style={{ fontSize: 18 }} />
          </button>

          <button
            className={`p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110 ${
              isFavorite
                ? "text-red-500 hover:bg-red-50"
                : "hover:bg-red-50 hover:text-red-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product._id);
            }}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <FavoriteIcon style={{ fontSize: 18 }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: 18 }} />
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 rounded-full bg-blue-50">
            {product.categoryName}
          </span>
          {product.inventory &&
            product.inventory.quantity < 5 &&
            product.inventory.quantity > 0 && (
              <span className="px-3 py-1 ml-2 text-xs font-semibold text-orange-600 rounded-full bg-orange-50">
                Low Stock
              </span>
            )}
        </div>

        {/* Product Title */}
        <h3
          className="mb-2 text-lg font-bold text-gray-800 cursor-pointer line-clamp-2 hover:text-blue-600"
          onClick={() => onProductClick(product)}
        >
          {product.title || "Untitled Product"}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating || 0) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating ? product.rating.toFixed(1) : "0.0"}
            {product.reviewCount > 0 && ` (${product.reviewCount})`}
          </span>
        </div>

        {/* Description */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* Free Shipping Badge */}
        {product.freeShipping && (
          <div className="flex items-center gap-1 mb-3">
            <LocalShippingIcon
              style={{ fontSize: 16 }}
              className="text-green-600"
            />
            <span className="text-sm font-medium text-green-600">
              Free Shipping
            </span>
          </div>
        )}

        {/* Price and Seller */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            $${product.price?.toFixed(2)}
          </span>
          <span className="text-sm italic text-gray-500">
            By {product.sellerName}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product._id)}
          disabled={isAddingToCart}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <AddShoppingCartIcon style={{ fontSize: 20 }} />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
