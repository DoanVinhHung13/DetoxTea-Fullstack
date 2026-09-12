import { Box, Card } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useOutletContext } from "react-router-dom";
import { BACKEND_API_URI } from "../../../utils/constants";
import Stores from "./Stores";

export default function ManageStore() {
  const { handleSetDashboardTitle } = useOutletContext();
  const [stores, setStores] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  // Set the dashboard title
  React.useEffect(() => {
    handleSetDashboardTitle("Manage Stores");
  }, [handleSetDashboardTitle]);

  // Fetch stores with ratings and pagination
  const updateStoreList = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BACKEND_API_URI}/admin/stores?page=${page}&limit=10&withRatings=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setStores(res.data.data);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (error) {
      console.error("Error fetching store list:", error);
    }
  };

  React.useEffect(() => {
    updateStoreList(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateStoreList(newPage);
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
        <Stores
          stores={stores}
          onStoreUpdated={updateStoreList}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
