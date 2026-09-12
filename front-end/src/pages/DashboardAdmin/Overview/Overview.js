import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URI } from "../../../utils/constants";

// MUI Components
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

// Icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

// Recharts
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

// Palette for charts
const CHART_COLORS = [
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#6366f1", // indigo
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // purple
  "#ef4444", // red
  "#14b8a6", // teal
];

const TIME_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "week", label: "7 ngày qua" },
  { value: "month", label: "30 ngày qua" },
  { value: "year", label: "12 tháng" },
];

// Modern Metric KPI Card
const ModernKpiCard = ({
  title,
  value,
  icon,
  gradientBg,
  iconBg,
  percentChange = null,
  subtitle = null,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
        border: "1px solid #e2e8f0",
        bgcolor: "#ffffff",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 24px -6px rgba(15, 23, 42, 0.08)",
          borderColor: "#cbd5e1",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: gradientBg || "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.72rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.02em",
                mt: 0.5,
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: iconBg || "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
          {percentChange !== null ? (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.2,
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  bgcolor: percentChange >= 0 ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                  color: percentChange >= 0 ? "#059669" : "#dc2626",
                }}
              >
                {percentChange >= 0 ? (
                  <ArrowUpwardIcon sx={{ fontSize: 13, mr: 0.2 }} />
                ) : (
                  <ArrowDownwardIcon sx={{ fontSize: 13, mr: 0.2 }} />
                )}
                {Math.abs(percentChange)}%
              </Box>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.72rem" }}>
                so với kỳ trước
              </Typography>
            </Stack>
          ) : (
            <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.72rem" }}>
              {subtitle || "Số liệu tích lũy hệ thống"}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const Overview = () => {
  const { handleSetDashboardTitle } = useOutletContext();
  const theme = useTheme();

  const [report, setReport] = useState(null);
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (handleSetDashboardTitle) {
      handleSetDashboardTitle("Dashboard Overview");
    }
  }, [handleSetDashboardTitle]);

  const fetchData = async (selectedPeriod = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BACKEND_API_URI}/admin/report${
          selectedPeriod ? `?period=${selectedPeriod}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        },
      );

      if (!res.data?.success) {
        throw new Error("Không thể tải báo cáo từ máy chủ");
      }

      // Calculate percentages for revenueByCategory
      const revenueByCategory = res.data.insights?.revenueByCategory || [];
      const totalRev = revenueByCategory.reduce((sum, item) => sum + (item.value || 0), 0);
      const revenueWithPercent = revenueByCategory.map((item) => ({
        ...item,
        value: totalRev > 0 ? Number(((item.value / totalRev) * 100).toFixed(1)) : 0,
      }));

      // Prepare orderStatus for PieChart
      const orderStatus = res.data.summary?.orderStatus || {};
      const orderStatusData = Object.entries(orderStatus)
        .map(([name, value]) => ({ name, value }))
        .filter((item) => item.value > 0);

      setReport({
        ...res.data,
        insights: {
          ...res.data.insights,
          revenueByCategory: revenueWithPercent,
        },
        summary: {
          ...res.data.summary,
          orderStatus: orderStatusData,
        },
      });
    } catch (err) {
      console.error("Error fetching report:", err.message);
      setError("Không thể tải dữ liệu phân tích. Vui lòng kiểm tra kết nối.");
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const formatNumber = (num) => {
    return num?.toLocaleString("vi-VN") || "0";
  };

  const formatCurrency = (num) => {
    if (!num) return "0₫";
    return `${Number(num).toLocaleString("vi-VN")}₫`;
  };

  const currentDateStr = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box>
      {/* WELCOME HERO BANNER */}
      <Box
        sx={{
          borderRadius: "20px",
          p: { xs: 2.5, sm: 3.5 },
          mb: 3.5,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #064e3b 100%)",
          color: "#ffffff",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Accent */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Chip
                icon={<SpaIcon sx={{ fontSize: "14px !important", color: "#34d399 !important" }} />}
                label="Hệ thống Quản trị Detox Tea"
                size="small"
                sx={{
                  bgcolor: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                }}
              />
              <Typography variant="caption" sx={{ color: "#94a3b8", display: { xs: "none", sm: "block" } }}>
                • {currentDateStr}
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                mb: 1,
              }}
            >
              Xin chào Admin, chúc bạn một ngày làm việc hiệu quả! 👋
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#cbd5e1", maxWidth: 580, fontSize: "0.9rem", lineHeight: 1.5 }}
            >
              Theo dõi tình hình kinh doanh, số lượng đơn hàng, người dùng và doanh số các mặt hàng trà thảo mộc theo thời gian thực.
            </Typography>
          </Grid>

          {/* Quick Period Switcher */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "flex-start", md: "flex-end" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  display: "inline-flex",
                  p: 0.5,
                  borderRadius: "12px",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                {TIME_OPTIONS.map((opt) => {
                  const isActive = period === opt.value;
                  return (
                    <Button
                      key={opt.value}
                      size="small"
                      onClick={() => setPeriod(opt.value)}
                      sx={{
                        px: 1.6,
                        py: 0.6,
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: isActive ? "#0f172a" : "#cbd5e1",
                        bgcolor: isActive ? "#ffffff" : "transparent",
                        boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                        "&:hover": {
                          bgcolor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                        },
                      }}
                    >
                      {opt.label}
                    </Button>
                  );
                })}
              </Paper>

              <Tooltip title="Làm mới dữ liệu">
                <span>
                  <IconButton
                    onClick={() => fetchData(period)}
                    disabled={loading}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                    }}
                  >
                    <RefreshIcon sx={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* LOADING OR ERROR STATES */}
      {loading && !report && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <CircularProgress sx={{ color: "#10b981", mb: 2 }} />
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Đang tổng hợp dữ liệu thống kê từ hệ thống...
          </Typography>
        </Box>
      )}

      {error && (
        <Box
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "14px",
            bgcolor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {error}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => fetchData(period)}
          >
            Thử lại
          </Button>
        </Box>
      )}

      {/* MAIN DATA DASHBOARD */}
      {report && (
        <>
          {/* PRIMARY KPI METRICS */}
          <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <ModernKpiCard
                title="Tổng Doanh Thu (Đã Giao)"
                value={formatCurrency(report.summary?.totalRevenue)}
                icon={<AccountBalanceWalletIcon />}
                iconBg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                gradientBg="radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(255,255,255,0) 70%)"
                percentChange={4.2}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <ModernKpiCard
                title="Tổng Đơn Hàng"
                value={formatNumber(report.summary?.totalOrders)}
                icon={<ShoppingBagOutlinedIcon />}
                iconBg="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
                gradientBg="radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(255,255,255,0) 70%)"
                percentChange={2.8}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <ModernKpiCard
                title="Tổng Người Dùng"
                value={formatNumber(report.summary?.totalUsers)}
                icon={<PeopleAltOutlinedIcon />}
                iconBg="linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                gradientBg="radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(255,255,255,0) 70%)"
                percentChange={6.5}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <ModernKpiCard
                title="Khách Mua Hàng"
                value={formatNumber(report.summary?.uniqueCustomers)}
                icon={<PersonOutlinedIcon />}
                iconBg="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                gradientBg="radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(255,255,255,0) 70%)"
                percentChange={-1.2}
              />
            </Grid>
          </Grid>

          {/* SECONDARY STATS ROW */}
          <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
            <Grid item xs={6} md={3}>
              <ModernKpiCard
                title="Sản Phẩm Đã Giao"
                value={formatNumber(report.summary?.productsShipped)}
                icon={<LocalShippingOutlinedIcon />}
                iconBg="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                subtitle="Đơn hoàn tất thành công"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <ModernKpiCard
                title="Người Mua Hoạt Động"
                value={formatNumber(report.summary?.activeBuyers)}
                icon={<PersonOutlinedIcon />}
                iconBg="linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                subtitle="Tương tác mua sắm gần đây"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <ModernKpiCard
                title="Cửa Hàng Đối Tác"
                value={formatNumber(report.summary?.activeSellers)}
                icon={<StorefrontOutlinedIcon />}
                iconBg="linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
                subtitle="Shop kinh doanh trên sàn"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <ModernKpiCard
                title="Tỷ Lệ Chuyển Đổi"
                value={`${report.summary?.conversionRate || 0}%`}
                icon={<TrendingUpOutlinedIcon />}
                iconBg="linear-gradient(135deg, #10b981 0%, #047857 100%)"
                subtitle="Lượt xem chuyển thành đơn"
              />
            </Grid>
          </Grid>

          {/* ANALYTICS CHARTS & RECENT USERS */}
          <Grid container spacing={3}>
            {/* Chart 1: Order Status Donut */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
                  border: "1px solid #e2e8f0",
                  height: 440,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Trạng Thái Đơn Hàng
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Tỷ lệ phân bổ trạng thái đơn đặt hàng
                  </Typography>

                  <Box sx={{ flexGrow: 1, minHeight: 220, position: "relative", my: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={report.summary?.orderStatus}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={85}
                          innerRadius={55}
                          paddingAngle={3}
                        >
                          {report.summary?.orderStatus?.map((entry, index) => (
                            <Cell
                              key={`status-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name) => [`${value} đơn`, `${name}`]}
                          contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  {/* Styled Legend */}
                  <Box sx={{ maxHeight: 110, overflowY: "auto", pr: 0.5 }}>
                    <Stack spacing={1}>
                      {report.summary?.orderStatus?.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "3px",
                                bgcolor: CHART_COLORS[idx % CHART_COLORS.length],
                              }}
                            />
                            <Typography sx={{ fontSize: "0.78rem", color: "#334155", textTransform: "capitalize" }}>
                              {item.name}
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a" }}>
                            {item.value} đơn
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Chart 2: Revenue by Category Bar Chart */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
                  border: "1px solid #e2e8f0",
                  height: 440,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Doanh Thu Theo Danh Mục (%)
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Tỷ trọng đóng góp doanh số từng nhóm trà
                  </Typography>

                  <Box sx={{ flexGrow: 1, minHeight: 310, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={report.insights?.revenueByCategory}
                        margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          interval={0}
                          angle={-35}
                          textAnchor="end"
                          axisLine={{ stroke: "#e2e8f0" }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={false}
                          tickLine={false}
                          unit="%"
                        />
                        <RechartsTooltip
                          formatter={(value) => [`${value}%`, "Tỷ trọng doanh thu"]}
                          contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          radius={[6, 6, 0, 0]}
                          maxBarSize={40}
                        >
                          {report.insights?.revenueByCategory?.map((entry, index) => (
                            <Cell
                              key={`cat-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Widget 3: Recent Users */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)",
                  border: "1px solid #e2e8f0",
                  height: 440,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Người Dùng Mới
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Tài khoản mới đăng ký trên hệ thống
                  </Typography>

                  <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    {report.insights?.recentUsers?.length > 0 ? (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.75rem", borderBottom: "1px solid #e2e8f0" }}>Thành viên</TableCell>
                            <TableCell sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.75rem", borderBottom: "1px solid #e2e8f0" }}>Vai trò</TableCell>
                            <TableCell sx={{ color: "#64748b", fontWeight: 600, fontSize: "0.75rem", borderBottom: "1px solid #e2e8f0" }}>Trạng thái</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {report.insights.recentUsers.map((user, idx) => (
                            <TableRow key={idx} hover sx={{ "&:last-child td": { border: 0 } }}>
                              <TableCell sx={{ py: 1.2 }}>
                                <Stack direction="row" spacing={1.2} alignItems="center">
                                  <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    sx={{ width: 32, height: 32, bgcolor: "#10b981", fontSize: "0.8rem", fontWeight: 600 }}
                                  >
                                    {user.name ? user.name.charAt(0) : "U"}
                                  </Avatar>
                                  <Box sx={{ overflow: "hidden" }}>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: 600,
                                        color: "#0f172a",
                                        fontSize: "0.82rem",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        maxWidth: 120,
                                      }}
                                    >
                                      {user.name}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell sx={{ py: 1.2 }}>
                                <Chip
                                  size="small"
                                  label={user.type === "seller" ? "Seller" : "Buyer"}
                                  sx={{
                                    height: 22,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    bgcolor: user.type === "seller" ? "rgba(6, 182, 212, 0.12)" : "rgba(16, 185, 129, 0.12)",
                                    color: user.type === "seller" ? "#0891b2" : "#059669",
                                  }}
                                />
                              </TableCell>
                              <TableCell sx={{ py: 1.2 }}>
                                <Stack direction="row" spacing={0.6} alignItems="center">
                                  <Box
                                    sx={{
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      bgcolor: user.status === "active" ? "#10b981" : "#94a3b8",
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: user.status === "active" ? "#10b981" : "#64748b",
                                      fontWeight: 600,
                                      fontSize: "0.72rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {user.status || "active"}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <Box sx={{ py: 4, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Chưa có hoạt động người dùng gần đây.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Overview;

