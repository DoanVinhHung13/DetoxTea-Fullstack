import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URI } from "../../../utils/constants";

// MUI Components
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// Icons
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import Title from "../Title";

const statusConfig = {
  pending: {
    label: "Chờ xử lý",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  approved: {
    label: "Đã duyệt",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.3)",
  },
  rejected: {
    label: "Từ chối",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.3)",
  },
  completed: {
    label: "Hoàn tất",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.3)",
  },
};

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "approved", label: "Đã duyệt" },
  { value: "rejected", label: "Từ chối" },
  { value: "completed", label: "Hoàn tất" },
];

export default function ManageReturnRequest() {
  const { handleSetDashboardTitle } = useOutletContext();

  useEffect(() => {
    if (handleSetDashboardTitle) {
      handleSetDashboardTitle("Quản lý Yêu cầu Đổi trả");
    }
  }, [handleSetDashboardTitle]);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("pending");
  const [saving, setSaving] = useState(false);
  const [reason, setReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BACKEND_API_URI}/admin/return-requests`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        },
      );
      setRequests(res.data?.data || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách đổi trả:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleOpen = (row) => {
    setSelected(row);
    setStatus(row.status || "pending");
    setReason(row.reason || "");
  };

  const handleClose = () => {
    setSelected(null);
    setStatus("pending");
    setReason("");
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await axios.put(
        `${BACKEND_API_URI}/admin/return-requests/${selected._id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        },
      );
      await fetchList();
      handleClose();
    } catch (err) {
      console.error("Lỗi cập nhật yêu cầu đổi trả:", err);
    } finally {
      setSaving(false);
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((row) => {
    const matchStatus = !statusFilter || row.status === statusFilter;
    const name = row.userId?.fullname || row.userId?.username || "";
    const code = row._id || "";
    const matchSearch =
      !searchTerm ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.reason && row.reason.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <Box>
      {/* Page Title */}
      <Title
        highlight={true}
        subtitle="Tiếp nhận, kiểm tra và giải quyết các yêu cầu đổi hàng / trả hàng hoàn tiền từ khách mua."
        action={
          <Tooltip title="Tải lại danh sách">
            <span>
              <IconButton
                onClick={fetchList}
                disabled={loading}
                sx={{
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                <RefreshIcon sx={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
              </IconButton>
            </span>
          </Tooltip>
        }
      >
        Quản Lý Yêu Cầu Đổi Trả
      </Title>

      {/* Main Table Card */}
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
          border: "1px solid #e2e8f0",
          bgcolor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* Filters Bar */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #f1f5f9",
            bgcolor: "#ffffff",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <TextField
            size="small"
            placeholder="Tìm theo mã yêu cầu, khách hàng, lý do..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: { xs: "100%", sm: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 170 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterAltOutlinedIcon sx={{ color: "#94a3b8", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {(statusFilter || searchTerm) && (
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setStatusFilter("");
                  setSearchTerm("");
                }}
                sx={{ color: "#64748b", fontWeight: 600 }}
              >
                Đặt lại
              </Button>
            )}
          </Stack>
        </Box>

        {/* Data Table */}
        {loading ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <CircularProgress sx={{ color: "#10b981", mb: 2 }} />
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Đang tải danh sách yêu cầu đổi trả...
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Mã yêu cầu
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Người yêu cầu
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Lý do đổi trả
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Trạng thái
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Thời gian tạo
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", fontSize: "0.8rem", py: 1.8 }}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <AssignmentReturnOutlinedIcon sx={{ fontSize: 44, color: "#cbd5e1" }} />
                        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                          Không tìm thấy yêu cầu đổi trả nào.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((row) => {
                    const cfg = statusConfig[row.status] || statusConfig.pending;
                    return (
                      <TableRow
                        key={row._id}
                        hover
                        sx={{
                          transition: "background-color 0.15s",
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: "#0f172a", fontSize: "0.82rem" }}>
                          #{row._id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>
                            {row.userId?.fullname || row.userId?.username || "Khách hàng"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                            {row.userId?.email || ""}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 220 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#475569",
                              fontSize: "0.85rem",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {row.reason || "Không ghi rõ"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={cfg.label}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              bgcolor: cfg.bgColor,
                              color: cfg.color,
                              border: `1px solid ${cfg.border}`,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "#64748b", fontSize: "0.8rem" }}>
                          {row.createdAt ? new Date(row.createdAt).toLocaleDateString("vi-VN") : "—"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityOutlinedIcon sx={{ fontSize: "15px !important" }} />}
                            onClick={() => handleOpen(row)}
                            sx={{
                              borderRadius: "8px",
                              borderColor: "#e2e8f0",
                              color: "#0f172a",
                              fontWeight: 600,
                              fontSize: "0.78rem",
                              px: 1.5,
                              "&:hover": {
                                borderColor: "#10b981",
                                bgcolor: "#f0fdf4",
                                color: "#10b981",
                              },
                            }}
                          >
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Details Dialog */}
      <Dialog
        open={Boolean(selected)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#0f172a", pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Chi tiết yêu cầu đổi trả</span>
          <IconButton size="small" onClick={handleClose}>
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 2.5 }}>
          {selected && (
            <Stack spacing={2.5}>
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                      Mã đơn gốc:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      {selected.orderItemId?.orderId?._id
                        ? `#${selected.orderItemId.orderId._id.slice(-6).toUpperCase()}`
                        : "Không xác định"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                      Người gửi yêu cầu:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      {selected.userId?.fullname || selected.userId?.username || "Khách mua"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, display: "block", mb: 0.5 }}>
                  Lý do khách hàng đưa ra:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    p: 1.5,
                    borderRadius: "8px",
                    bgcolor: "#fffbeb",
                    border: "1px solid #fef3c7",
                    color: "#92400e",
                    fontWeight: 500,
                  }}
                >
                  "{selected.reason || "Khách hàng không điền lý do chi tiết."}"
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                  Sản phẩm yêu cầu đổi trả:
                </Typography>
                {selected.orderItemId ? (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {selected.orderItemId.productId?.image && (
                      <Avatar
                        variant="rounded"
                        src={selected.orderItemId.productId.image}
                        sx={{ width: 56, height: 56, borderRadius: "8px" }}
                      />
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                        {selected.orderItemId.productId?.title || "Sản phẩm"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>
                        Số lượng: <strong>{selected.orderItemId.quantity}</strong> • Đơn giá:{" "}
                        <strong>{selected.orderItemId.unitPrice?.toLocaleString()}₫</strong>
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Không tìm thấy sản phẩm liên quan.
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                  Cập nhật quyết định của Admin:
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Trạng thái xử lý"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="pending">Chờ xử lý</MenuItem>
                  <MenuItem value="approved">Duyệt yêu cầu (Cho phép đổi / trả hàng)</MenuItem>
                  <MenuItem value="rejected">Từ chối yêu cầu</MenuItem>
                  <MenuItem value="completed">Đã hoàn tất đổi trả & hoàn tiền</MenuItem>
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} sx={{ color: "#64748b" }}>
            Đóng
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={saving}
            sx={{
              bgcolor: "#10b981",
              color: "#ffffff",
              "&:hover": { bgcolor: "#059669" },
            }}
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

