import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchUserProfile,
  resetUpdateStatus,
  updateUserProfile,
} from "../../features/profile/profileSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Design Palette
  const palette = {
    cream: "#F9F7F2",
    forestGreen: "#2D4F3E",
    charcoal: "#1A1A1A",
    softGold: "#C5A059",
    white: "#FFFFFF",
  };

  const fonts = {
    title: "'Playfair Display', serif",
    body: "'Montserrat', sans-serif",
  };

  // Redux State
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user, loading, error, updateSuccess, updateLoading, updateError } =
    useSelector((state) => state.profile);

  // Component State
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    avatarURL: "",
    fullname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      const timer = setTimeout(() => {
        if (!isAuthenticated) navigate("/signin");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        avatarURL: user?.avatarURL || "",
        fullname: user.fullname || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      setSuccessMsg("Cập nhật thông tin thành công!");
      setEditMode(false);
      setForm((prev) => ({ ...prev, password: "" }));
      setTimeout(() => dispatch(resetUpdateStatus()), 3000);
    }
  }, [updateSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
    if (name === "avatarURL") setAvatarError(false);
  };

  const validateForm = () => {
    const errors = {};
    if (form.fullname && form.fullname.length < 2)
      errors.fullname = "Họ tên phải dài ít nhất 2 ký tự";
    if (form.password && form.password.length < 6)
      errors.password = "Mật khẩu phải dài ít nhất 6 ký tự";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) setConfirmDialog(true);
  };

  const handleSave = async () => {
    setConfirmDialog(false);
    const dataToSend = { ...form };
    if (!dataToSend.password) delete dataToSend.password;
    dispatch(updateUserProfile(dataToSend));
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      avatarURL: user?.avatarURL || "",
      fullname: user?.fullname || "",
      password: "",
    });
    setFormErrors({});
  };

  const handleRefresh = () => dispatch(fetchUserProfile());

  const avatarUrl = editMode
    ? form.avatarURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname || user.username || "U")}&background=8BA889&color=F9F7F2`
    : user.avatarURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname || user.username || "U")}&background=8BA889&color=F9F7F2`;

  const commonButtonSx = {
    fontFamily: fonts.body,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 2,
    px: 3,
    py: 1,
  };

  const mainContent = (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        mt: { xs: 4, md: 6 },
        border: "1px solid #00000010",
      }}
    >
      <Box sx={{ bgcolor: palette.forestGreen, height: 100, width: "100%" }} />
      <CardContent
        sx={{ p: { xs: 2, md: 4 }, pt: 0, mt: -8, position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatarError ? null : avatarUrl}
            sx={{
              width: 120,
              height: 120,
              border: `4px solid ${palette.white}`,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              bgcolor: "primary.light",
              fontSize: "4rem",
              fontFamily: fonts.title,
            }}
          >
            {avatarError && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>

          <Box sx={{ width: "100%", mt: 4 }}>
            {editMode ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Link ảnh đại diện"
                    name="avatarURL"
                    value={form.avatarURL}
                    onChange={handleChange}
                    fullWidth
                    error={avatarError}
                    helperText={avatarError ? "URL ảnh không hợp lệ" : ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Họ tên"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    fullWidth
                    error={!!formErrors.fullname}
                    helperText={formErrors.fullname}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mật khẩu mới (để trống nếu không đổi)"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontFamily: fonts.title,
                    color: palette.charcoal,
                  }}
                >
                  {user.fullname || user.username || "No name"}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontFamily={fonts.body}
                  >
                    Username
                  </Typography>
                  <Typography
                    fontFamily={fonts.body}
                    sx={{ fontWeight: "medium" }}
                  >
                    {user?.username || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontFamily={fonts.body}
                  >
                    Email
                  </Typography>
                  <Typography
                    fontFamily={fonts.body}
                    sx={{ fontWeight: "medium" }}
                  >
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontFamily={fonts.body}
                  >
                    Vai trò
                  </Typography>
                  <Typography
                    fontFamily={fonts.body}
                    sx={{ fontWeight: "medium", textTransform: "capitalize" }}
                  >
                    {user?.role === "buyer"
                      ? "Người mua"
                      : user?.role === "seller"
                        ? "Người bán"
                        : user?.role || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
              {user.action && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color:
                        user.action === "lock" ? "error.main" : "success.main",
                    }}
                  >
                    Trạng thái:{" "}
                    {user.action === "lock"
                      ? "Tài khoản bị khóa"
                      : "Đang hoạt động"}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={updateLoading}
                      startIcon={<SaveIcon />}
                      sx={{
                        ...commonButtonSx,
                        bgcolor: palette.forestGreen,
                        color: palette.cream,
                        "&:hover": { bgcolor: "#213B2F" },
                      }}
                    >
                      {updateLoading ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      disabled={updateLoading}
                      startIcon={<CancelIcon />}
                      sx={{
                        ...commonButtonSx,
                        borderColor: palette.softGold,
                        color: palette.softGold,
                        "&:hover": { bgcolor: "rgba(197, 160, 89, 0.04)" },
                      }}
                    >
                      Hủy
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => setEditMode(true)}
                      startIcon={<EditIcon />}
                      sx={{
                        ...commonButtonSx,
                        bgcolor: palette.forestGreen,
                        color: palette.cream,
                        "&:hover": { bgcolor: "#213B2F" },
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleRefresh}
                      startIcon={<RefreshIcon />}
                      sx={{
                        ...commonButtonSx,
                        borderColor: palette.softGold,
                        color: palette.softGold,
                        "&:hover": { bgcolor: "rgba(197, 160, 89, 0.04)" },
                      }}
                    >
                      Làm mới
                    </Button>
                  </>
                )}
              </Box>
              <Tooltip title="ID tài khoản" arrow placement="top">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    mt: 4,
                    fontFamily: fonts.body,
                  }}
                >
                  ID: {user._id}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: palette.cream, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress sx={{ color: palette.forestGreen }} />
          </Box>
        ) : error && !user ? (
          <Paper sx={{ p: 4, textAlign: "center", fontFamily: fonts.body }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
              >
                Thử lại
              </Button>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/signin")}
              >
                Đăng nhập
              </Button>
            </Box>
          </Paper>
        ) : !user ? (
          <Paper sx={{ p: 4, textAlign: "center", fontFamily: fonts.body }}>
            <Typography variant="h6" color="error">
              Không có dữ liệu người dùng.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Tải lại
            </Button>
          </Paper>
        ) : (
          mainContent
        )}
      </Container>

      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle sx={{ fontFamily: fonts.title }}>
          Xác nhận thay đổi
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: fonts.body }}>
            Bạn có chắc chắn muốn lưu những thay đổi này không?
            {form.password && (
              <Typography color={palette.forestGreen} sx={{ mt: 1 }}>
                *Mật khẩu của bạn sẽ được thay đổi.
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button
            onClick={() => setConfirmDialog(false)}
            sx={{ ...commonButtonSx, color: palette.softGold }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            autoFocus
            sx={{
              ...commonButtonSx,
              bgcolor: palette.forestGreen,
              color: palette.cream,
              "&:hover": { bgcolor: "#213B2F" },
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMsg("")}
          severity="success"
          sx={{ width: "100%", fontFamily: fonts.body }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!updateError}
        autoHideDuration={3000}
        onClose={() => dispatch(resetUpdateStatus())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(resetUpdateStatus())}
          severity="error"
          sx={{ width: "100%", fontFamily: fonts.body }}
        >
          {updateError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
