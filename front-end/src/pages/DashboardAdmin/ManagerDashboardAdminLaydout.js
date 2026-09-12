import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { resetUserInfo } from "../../redux/slices/orebi.slice";
import AuthenService from "../../services/api/AuthenService";
import { BACKEND_API_URI } from "../../utils/constants";

// MUI Components
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Popover,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

// Icons
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const drawerWidth = 270;

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#10b981", // Emerald green
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#06b6d4", // Cyan
      light: "#22d3ee",
      dark: "#0891b2",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  color: "#0f172a",
  boxShadow: "none",
  borderBottom: "1px solid #e2e8f0",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#0f172a", // Luxury Slate dark
    color: "#94a3b8",
    borderRight: "1px solid #1e293b",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(9),
    }),
  },
}));

export default function AdminDashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dashboardTitle, setDashboardTitle] = useState("Dashboard Overview");
  const [open, setOpen] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  // Menus and Dialogs
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const currentPath = location.pathname;

  // Fetch admin stats
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get(`${BACKEND_API_URI}/admin/report`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data?.success) {
            setAdminInfo({
              fullname: "Admin Detox Tea",
              role: "Administrator",
              avatarURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            });
          }
        })
        .catch(() => {
          setAdminInfo({
            fullname: "Detox Admin",
            role: "Administrator",
            avatarURL: "",
          });
        });
    } else {
      setAdminInfo({
        fullname: "Detox Admin",
        role: "Administrator",
        avatarURL: "",
      });
    }
  }, []);

  const handleSetDashboardTitle = (newTitle) => {
    setDashboardTitle(newTitle);
  };

  const handleSignOut = async () => {
    try {
      await AuthenService.logout();
    } catch (e) {
      console.error(e);
    }
    dispatch(resetUserInfo());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/signin");
  };

  // Nav items configuration grouped by section
  const navSections = [
    {
      title: "TỔNG QUAN",
      items: [
        {
          label: "Dashboard Overview",
          path: "/admin",
          icon: <DashboardOutlinedIcon />,
          badge: "Live",
        },
      ],
    },
    {
      title: "QUẢN LÝ BÁN HÀNG",
      items: [
        {
          label: "Quản lý Đơn hàng",
          path: "/admin/manage-orders",
          icon: <ReceiptLongOutlinedIcon />,
        },
        {
          label: "Quản lý Sản phẩm",
          path: "/admin/manage-products",
          icon: <Inventory2OutlinedIcon />,
        },
        {
          label: "Cửa hàng & Đối tác",
          path: "/admin/manage-stores",
          icon: <StorefrontOutlinedIcon />,
        },
        {
          label: "Mã Khuyến mãi",
          path: "/admin/manage-vouchers",
          icon: <LocalOfferOutlinedIcon />,
        },
      ],
    },
    {
      title: "TÀI CHÍNH & VẬN HÀNH",
      items: [
        {
          label: "Quản lý Thanh toán",
          path: "/admin/manage-payments",
          icon: <AccountBalanceWalletOutlinedIcon />,
        },
        {
          label: "Yêu cầu Đổi trả",
          path: "/admin/manage-returns",
          icon: <AssignmentReturnOutlinedIcon />,
        },
      ],
    },
    {
      title: "HỆ THỐNG",
      items: [
        {
          label: "Người dùng & Phân quyền",
          path: "/admin/manage-users",
          icon: <PeopleAltOutlinedIcon />,
        },
      ],
    },
  ];

  // Helper to find breadcrumb display label
  const getBreadcrumbLabel = () => {
    for (const section of navSections) {
      for (const item of section.items) {
        if (item.path === currentPath) return item.label;
      }
    }
    return dashboardTitle;
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <CssBaseline />

        {/* TOPBAR */}
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ pr: 3, pl: 2, height: 70 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                mr: 2,
                color: "#64748b",
                "&:hover": { color: "#0f172a", bgcolor: "#f1f5f9" },
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Breadcrumbs */}
            <Box sx={{ flexGrow: 1 }}>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  "& .MuiBreadcrumbs-separator": { color: "#cbd5e1" },
                }}
              >
                <MuiLink
                  underline="hover"
                  color="#64748b"
                  sx={{
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  onClick={() => navigate("/admin")}
                >
                  <SpaIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  Admin
                </MuiLink>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0f172a",
                    fontWeight: 600,
                  }}
                >
                  {getBreadcrumbLabel()}
                </Typography>
              </Breadcrumbs>
            </Box>

            {/* Topbar Actions */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Quick Link to Customer Store */}
              <Tooltip title="Xem giao diện khách hàng">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNewIcon sx={{ fontSize: "16px !important" }} />}
                  onClick={() => window.open("/", "_blank")}
                  sx={{
                    borderColor: "#e2e8f0",
                    color: "#475569",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.6,
                    "&:hover": {
                      borderColor: "#cbd5e1",
                      bgcolor: "#f8fafc",
                      color: "#0f172a",
                    },
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Xem Cửa hàng
                </Button>
              </Tooltip>

              {/* Notifications */}
              <Tooltip title="Thông báo hệ thống">
                <IconButton
                  onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
                  sx={{
                    color: "#64748b",
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    "&:hover": { color: "#10b981", bgcolor: "#f0fdf4" },
                  }}
                >
                  <Badge
                    badgeContent={3}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#10b981",
                        color: "white",
                        fontSize: "0.65rem",
                        height: 16,
                        minWidth: 16,
                      },
                    }}
                  >
                    <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Notification Popover */}
              <Popover
                open={Boolean(notificationAnchorEl)}
                anchorEl={notificationAnchorEl}
                onClose={() => setNotificationAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    width: 320,
                    p: 2,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    border: "1px solid #e2e8f0",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Thông báo mới
                  </Typography>
                  <Chip label="3 mới" size="small" sx={{ bgcolor: "#ecfdf5", color: "#059669", fontWeight: 600, height: 20 }} />
                </Box>
                <Divider sx={{ mb: 1.5 }} />
                <Stack spacing={1.5}>
                  <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#f8fafc", cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#0f172a", display: "block" }}>
                      📦 Đơn hàng mới #1089
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Khách hàng vừa đặt đơn 450.000₫ • 5 phút trước
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#f8fafc", cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#0f172a", display: "block" }}>
                      🔄 Yêu cầu đổi trả cần duyệt
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Người mua gửi ảnh sản phẩm lỗi • 30 phút trước
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#f8fafc", cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#0f172a", display: "block" }}>
                      🏪 Cửa hàng mới đăng ký
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Shop "Trà Thảo Mộc Sạch" chờ kích hoạt
                    </Typography>
                  </Box>
                </Stack>
              </Popover>

              {/* Admin Profile Trigger */}
              <Box
                onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  p: "4px 10px 4px 6px",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#cbd5e1",
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                <Avatar
                  src={adminInfo?.avatarURL}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#10b981",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {adminInfo?.fullname ? adminInfo.fullname.charAt(0) : "A"}
                </Avatar>
                <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.2 }}>
                    {adminInfo?.fullname || "Admin"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600 }}>
                    Quản trị viên
                  </Typography>
                </Box>
              </Box>

              {/* Profile Dropdown Menu */}
              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={() => setProfileAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    width: 210,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    border: "1px solid #e2e8f0",
                  },
                }}
              >
                <MenuItem onClick={() => { setProfileAnchorEl(null); navigate("/profile"); }}>
                  <ListItemIcon><PersonOutlineIcon fontSize="small" sx={{ color: "#64748b" }} /></ListItemIcon>
                  <ListItemText primary="Hồ sơ tài khoản" primaryTypographyProps={{ fontSize: "0.875rem" }} />
                </MenuItem>
                <MenuItem onClick={() => { setProfileAnchorEl(null); navigate("/"); }}>
                  <ListItemIcon><OpenInNewIcon fontSize="small" sx={{ color: "#64748b" }} /></ListItemIcon>
                  <ListItemText primary="Xem website" primaryTypographyProps={{ fontSize: "0.875rem" }} />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    setProfileAnchorEl(null);
                    setLogoutConfirmOpen(true);
                  }}
                  sx={{ color: "#ef4444" }}
                >
                  <ListItemIcon><ExitToAppIcon fontSize="small" sx={{ color: "#ef4444" }} /></ListItemIcon>
                  <ListItemText primary="Đăng xuất" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 600 }} />
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* SIDEBAR DRAWER */}
        <Drawer variant="permanent" open={open}>
          <Box>
            {/* Brand Logo Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2.5,
                height: 70,
                borderBottom: "1px solid #1e293b",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => navigate("/admin")}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                    flexShrink: 0,
                  }}
                >
                  <SpaIcon sx={{ fontSize: 20 }} />
                </Box>
                {open && (
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#f8fafc",
                        fontSize: "0.95rem",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                      }}
                    >
                      Detox Tea
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <FiberManualRecordIcon sx={{ fontSize: 8, color: "#10b981" }} />
                      <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 500 }}>
                        Admin Portal
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </Box>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#94a3b8",
                  "&:hover": { color: "#ffffff", bgcolor: "#1e293b" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Box>

            {/* Navigation Menus */}
            <List component="nav" sx={{ px: 1.5, py: 2 }}>
              {navSections.map((section, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  {open && (
                    <ListSubheader
                      sx={{
                        backgroundColor: "transparent",
                        color: "#64748b",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        lineHeight: "24px",
                        px: 1.5,
                        mb: 0.5,
                      }}
                    >
                      {section.title}
                    </ListSubheader>
                  )}
                  {section.items.map((item) => {
                    const isSelected =
                      item.path === "/admin"
                        ? currentPath === "/admin"
                        : currentPath.startsWith(item.path);

                    return (
                      <Tooltip
                        key={item.path}
                        title={!open ? item.label : ""}
                        placement="right"
                      >
                        <ListItemButton
                          onClick={() => navigate(item.path)}
                          selected={isSelected}
                          sx={{
                            borderRadius: "10px",
                            mb: 0.5,
                            py: 1,
                            px: 1.5,
                            transition: "all 0.15s ease",
                            color: isSelected ? "#ffffff" : "#94a3b8",
                            backgroundColor: isSelected
                              ? "rgba(16, 185, 129, 0.15) !important"
                              : "transparent",
                            borderLeft: isSelected ? "3px solid #10b981" : "3px solid transparent",
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "rgba(16, 185, 129, 0.22)"
                                : "#1e293b",
                              color: "#f8fafc",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 36,
                              color: isSelected ? "#10b981" : "#94a3b8",
                              transition: "color 0.15s",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: "0.85rem",
                                fontWeight: isSelected ? 600 : 500,
                              }}
                            />
                          )}
                          {open && item.badge && (
                            <Chip
                              label={item.badge}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                bgcolor: "rgba(16, 185, 129, 0.2)",
                                color: "#34d399",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                              }}
                            />
                          )}
                        </ListItemButton>
                      </Tooltip>
                    );
                  })}
                </Box>
              ))}
            </List>
          </Box>

          {/* Sidebar Footer */}
          <Box sx={{ p: 2, borderTop: "1px solid #1e293b" }}>
            {open ? (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, overflow: "hidden" }}>
                  <Avatar
                    src={adminInfo?.avatarURL}
                    sx={{ width: 34, height: 34, bgcolor: "#10b981", fontSize: "0.8rem", fontWeight: 700 }}
                  >
                    {adminInfo?.fullname ? adminInfo.fullname.charAt(0) : "A"}
                  </Avatar>
                  <Box sx={{ overflow: "hidden" }}>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "#f8fafc",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {adminInfo?.fullname || "Admin"}
                    </Typography>
                    <Typography sx={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 500 }}>
                      Hệ thống hoạt động
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title="Đăng xuất">
                  <IconButton
                    size="small"
                    onClick={() => setLogoutConfirmOpen(true)}
                    sx={{
                      color: "#94a3b8",
                      "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" },
                    }}
                  >
                    <ExitToAppIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title="Đăng xuất" placement="right">
                <IconButton
                  onClick={() => setLogoutConfirmOpen(true)}
                  sx={{
                    width: "100%",
                    color: "#94a3b8",
                    "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" },
                  }}
                >
                  <ExitToAppIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Drawer>

        {/* MAIN WORKSPACE CANVAS */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar sx={{ height: 70 }} />
          <Container
            maxWidth="xl"
            sx={{
              py: 3.5,
              px: { xs: 2, sm: 3, md: 4 },
              flexGrow: 1,
            }}
          >
            {/* The page renders cleanly without being constrained inside an ugly rigid Paper */}
            <Outlet context={{ handleSetDashboardTitle }} />
          </Container>

          {/* Footer Bar */}
          <Box
            sx={{
              py: 2.5,
              px: 4,
              borderTop: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.8rem" }}>
              © {new Date().getFullYear()} <strong>Detox Tea Co.</strong> — Hệ thống quản trị trung tâm.
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
              Phiên bản 2.5.0 • Trạng thái: Ổn định
            </Typography>
          </Box>
        </Box>

        {/* LOGOUT CONFIRMATION DIALOG */}
        <Dialog
          open={logoutConfirmOpen}
          onClose={() => setLogoutConfirmOpen(false)}
          PaperProps={{
            sx: { borderRadius: "14px", p: 1, width: 380 },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, color: "#0f172a", pb: 1 }}>
            Xác nhận đăng xuất
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#64748b" }}>
              Bạn có chắc chắn muốn đăng xuất khỏi trang Quản trị Admin không?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setLogoutConfirmOpen(false)}
              sx={{ color: "#64748b" }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={handleSignOut}
              sx={{
                bgcolor: "#ef4444",
                color: "#ffffff",
                "&:hover": { bgcolor: "#dc2626" },
              }}
            >
              Đăng xuất
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

