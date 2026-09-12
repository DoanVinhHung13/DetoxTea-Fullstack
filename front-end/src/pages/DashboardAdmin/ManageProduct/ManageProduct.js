import { Box, Card } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useOutletContext } from "react-router-dom";
import { BACKEND_API_URI } from "../../../utils/constants";
import Products from "./Products";

export default function ManageProductA() {
  const { handleSetDashboardTitle } = useOutletContext();
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  // Set the dashboard title
  React.useEffect(() => {
    handleSetDashboardTitle("Manage Products");
  }, [handleSetDashboardTitle]);

  // Fetch products with pagination
  const updateProductList = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BACKEND_API_URI}/admin/products?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  React.useEffect(() => {
    updateProductList(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateProductList(newPage);
    }
  };

  return (
    <Box>
      <Card
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
          p: { xs: 2, sm: 3 },
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Products
          products={products}
          onProductUpdated={updateProductList}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
