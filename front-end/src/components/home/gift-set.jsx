import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const palette = {
  cream: "#FDFBF7",
  forestGreen: "#2D4F3E",
  sageGreen: "#8BA889",
  charcoal: "#1A1A1A",
  softGold: "#C5A059",
  white: "#FFFFFF",
  //
};
// Styled Components
const MainSection = styled(Box)({
  backgroundColor: palette.cream,
  minHeight: "100vh",
  paddingTop: "60px",
  paddingBottom: "60px",
});

const ElegantImageCard = styled(Paper)({
  padding: "40px",
  borderRadius: 0,
  backgroundColor: palette.cream,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "600px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    border: `1px solid ${palette.sageGreen}`,
    pointerEvents: "none",
  },
});

const ContentBox = styled(Box)({
  backgroundColor: palette.cream,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "600px",
});

const LabelText = styled(Typography)({
  fontFamily: '"Montserrat", sans-serif',
  color: palette.forestGreen,
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "24px",
});

const TeaTitle = styled(Typography)({
  fontFamily: '"Playfair Display", serif',
  color: palette.forestGreen,
  fontWeight: 700,
  fontSize: "3.5rem",
  lineHeight: 1.2,
  letterSpacing: "1px",
  marginBottom: "32px",
});

const DescriptionText = styled(Typography)({
  color: palette.charcoal,
  fontSize: "0.95rem",
  lineHeight: 1.8,
  marginBottom: "24px",
  textAlign: "justify",
  fontFamily: '"Montserrat", sans-serif',
});

const LuxuryButton = styled(Button)(({ variant }) => ({
  borderRadius: 0,
  padding: "14px 40px",
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontWeight: 600,
  fontSize: "0.875rem",
  transition: "all 0.4s ease",
  backgroundColor:
    variant === "contained" ? palette.forestGreen : "transparent",
  borderColor: palette.forestGreen,
  color: variant === "contained" ? palette.cream : palette.forestGreen,
  fontFamily: '"Montserrat", sans-serif',
  "&:hover": {
    backgroundColor:
      variant === "contained" ? palette.softGold : palette.forestGreen,
    color: palette.white,
    borderColor: palette.softGold,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(45, 79, 62, 0.3)",
  },
}));

export default function GiftSet() {
  return (
    <MainSection>
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={0}>
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <ElegantImageCard elevation={0}>
              <Box
                component="img"
                src="/gift-set-premium-tea.jpg"
                alt="Premium Tea Gift Set"
                sx={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                }}
              />
            </ElegantImageCard>
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} md={6}>
            <ContentBox>
              <LabelText>LIMITED EDITION COLLECTION</LabelText>

              <TeaTitle>YÊN TẾT: Nồng đậm vị trà, ngọt thanh bánh xưa</TeaTitle>

              <DescriptionText>
                Gói trọn sự giao thoa giữa mỹ nghệ ép kim lộng lẫy và cốt cách
                trà Việt nguyên bản. Nơi những lá trà được "hồi sinh" sánh đôi
                cùng vị bánh đậu xanh thủ công tan mịn, gửi trao lời chúc an yên
                và thịnh vượng trong một kiệt tác tinh xảo.
              </DescriptionText>

              <DescriptionText>
                Nối dài mạch nguồn tri ân thông qua từng chi tiết nhỏ được chăm
                chút tỉ mỉ. Mỗi hộp quà không chỉ chứa đựng tinh túy từ đất mẹ
                Lâm Đồng, mà còn là nhịp cầu kết nối những tấm chân tình, biến
                khoảnh khắc sum vầy ngày Tết thành một kỷ niệm trọn vẹn và đậm
                đà nghĩa tình.
              </DescriptionText>

              <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
                <LuxuryButton variant="contained">MUA NGAY</LuxuryButton>
              </Box>
            </ContentBox>
          </Grid>
        </Grid>
      </Container>
    </MainSection>
  );
}
