import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Avatar,
  Box,
  Button,
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

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user, loading, error, updateSuccess, updateLoading, updateError } =
    useSelector((state) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    avatarURL: "",
    fullname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        avatarURL: user.avatarURL || "",
        fullname: user.fullname || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      setSuccessMsg("Tuyệt vời! Thông tin của bạn đã được cập nhật.");
      setEditMode(false);
      setForm((prev) => ({ ...prev, password: "" }));
      setTimeout(() => dispatch(resetUpdateStatus()), 3000);
    }
  }, [updateSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSave = async () => {
    setConfirmDialog(false);
    const dataToSend = { ...form };
    if (!dataToSend.password) delete dataToSend.password;
    dispatch(updateUserProfile(dataToSend));
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#fdfbf7",
        }}
      >
        <CircularProgress sx={{ color: "#1E4D3B" }} />
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "#fdfbf7", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* LEFT COLUMN: AVATAR & QUICK INFO */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                textAlign: "center",
                border: "1px solid #C5A059",
                bgcolor: "white",
                height: "100%",
              }}
            >
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 3 }}
              >
                <Avatar
                  src={form.avatarURL || user?.avatarURL}
                  sx={{
                    width: 160,
                    height: 160,
                    mx: "auto",
                    border: "4px solid #fdfbf7",
                    boxShadow: "0 10px 30px rgba(30, 77, 59, 0.15)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    bgcolor: "#1E4D3B",
                    borderRadius: "50%",
                    p: 0.5,
                    color: "white",
                    display: "flex",
                  }}
                >
                  <VerifiedUserIcon fontSize="small" />
                </Box>
              </Box>

              <Typography
                variant="h5"
                sx={{ fontBold: "serif", color: "#1E4D3B", fontWeight: 700 }}
              >
                {user?.fullname || user?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#C5A059", letterSpacing: 2, mb: 3 }}
              >
                {user?.role === "seller" ? "PREMIUM SELLER" : "VALUED BUYER"}
              </Typography>

              <Divider sx={{ my: 3, opacity: 0.5 }} />

              <Box sx={{ textAlign: "left", mb: 4 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  Username
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                  @{user?.username}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Jan 2026
                </Typography>
              </Box>

              {!editMode && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{
                    bgcolor: "#1E4D3B",
                    borderRadius: "12px",
                    py: 1.5,
                    "&:hover": { bgcolor: "#15382B" },
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: DETAILED FORM */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "24px",
                bgcolor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontBold: "serif", color: "#1E4D3B", mb: 1 }}
              >
                Account Settings
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 5 }}
              >
                Manage your public information and security settings.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, ml: 1, fontWeight: 700 }}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your name"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, ml: 1, fontWeight: 700 }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    value={user?.email}
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#f9f9f9",
                      },
                    }}
                  />
                </Grid>

                {editMode && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, ml: 1, fontWeight: 700 }}
                    >
                      New Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                  </Grid>
                )}
              </Grid>

              {editMode && (
                <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => setConfirmDialog(true)}
                    disabled={updateLoading}
                    sx={{
                      bgcolor: "#1E4D3B",
                      borderRadius: "12px",
                      px: 4,
                      "&:hover": { bgcolor: "#15382B" },
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setEditMode(false)}
                    sx={{
                      color: "#1E4D3B",
                      borderColor: "#1E4D3B",
                      borderRadius: "12px",
                      px: 4,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* DIALOGS & SNACKBARS - Giữ nguyên logic cũ nhưng đổi style */}
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
      >
        <DialogTitle sx={{ fontBold: "serif", color: "#1E4D3B" }}>
          Xác nhận thay đổi?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mọi thay đổi về thông tin cá nhân sẽ có hiệu lực ngay lập tức trên
            toàn hệ thống.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setConfirmDialog(false)}
            sx={{ color: "text.secondary" }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ bgcolor: "#1E4D3B", borderRadius: "10px" }}
          >
            Xác nhận lưu
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
          severity="success"
          sx={{
            borderRadius: "12px",
            bgcolor: "#1E4D3B",
            color: "white",
            "& .MuiAlert-icon": { color: "white" },
          }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
