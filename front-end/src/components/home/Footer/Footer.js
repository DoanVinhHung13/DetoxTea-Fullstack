import { useState } from "react";
import { Link } from "react-router-dom";
import logoTrang from "../../../assets/images/home/logo-trang.png";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <footer className="bg-[#1E4D3B] text-white pt-20 pb-10">
      <div className="container px-6 mx-auto">
        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* LOGO + BRAND */}
          <div className="space-y-4 lg:col-span-2">
            <img src={logoTrang} alt="YÊN Detox Tea" className="w-auto h-16" />

            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              YÊN trân quý những lá trà Lâm Đồng lỡ hẹn với vẻ ngoài hoàn hảo.
              Chúng tôi chắt chiu tinh túy ấy để tạo nên dòng detox nguyên bản.
            </p>
          </div>

          {/* COLUMN 1 - SỨ MỆNH */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Sứ mệnh
            </h4>

            <p className="text-sm leading-relaxed text-white/70">
              Hồi sinh những lá trà bị bỏ lỡ, mang chất trà thật đến với những
              tâm hồn trân trọng giá trị nội tại.
            </p>
          </div>

          {/* COLUMN 2 - SẢN PHẨM */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Sản phẩm theo gu
            </h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/auth/product/69a68e26b919ce2cf32db334"
                  className="block w-full h-full"
                >
                  Sương Mai - Thanh nhẹ
                </Link>
              </li>
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/auth/product/60d21b4667d0d8992e610100"
                  className="block w-full h-full"
                >
                  Nhã Hương - Thơm dịu
                </Link>
              </li>
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/auth/product/60d21b4667d0d8992e610110"
                  className="block w-full h-full"
                >
                  Tình Sắc - Đậm vị
                </Link>
              </li>
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/auth/product/69a68e4ab919ce2cf32db335"
                  className="block w-full h-full"
                >
                  Hộp quà Tết
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - MINH BẠCH */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Sự minh bạch
            </h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/news/tro-ve-voi-nhung-nuong-che-lang-le-lam-dong"
                  className="block w-full h-full"
                >
                  Hành trình trà từ Lâm Đồng
                </Link>
              </li>
              <li className="cursor-pointer hover:text-white">
                <Link
                  to="/news/thuong-tra-khoanh-khac-tinh-lang-giua-nhip-song-hoi-ha"
                  className="block w-full h-full"
                >
                  Vẻ đẹp "Trà lệch chuẩn"
                </Link>
              </li>
              <Link
                to="/news/tra-va-nhung-cau-chuyen-bat-ngo"
                className="block w-full h-full"
              >
                Nghệ thuật pha trà
              </Link>
              <li className="cursor-pointer hover:text-white"></li>
            </ul>
          </div>

          {/* NEWSLETTER + CONTACT */}
          <div className="space-y-6">
            {/* CONTACT */}
            <div>
              <p className="mb-2 text-sm font-semibold tracking-widest uppercase">
                Kết nối
              </p>

              <p className="text-sm text-white/70">(+84) 271 837 323</p>
              <p className="text-sm text-white/70">yen.detox@gmail.com</p>
            </div>
          </div>
        </div>

        {/* BRAND VALUE STRIP */}
        <div className="grid grid-cols-1 gap-10 pt-12 mt-20 text-center border-t md:grid-cols-3 border-white/10">
          <div className="space-y-3">
            <div className="flex items-center justify-center w-12 h-12 mx-auto border rounded-full border-white/40">
              🍃
            </div>
            <p className="text-xs tracking-widest uppercase">100% Trà thật</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center w-12 h-12 mx-auto border rounded-full border-white/40">
              ♻
            </div>
            <p className="text-xs tracking-widest uppercase">
              Hồi sinh trà Việt
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center w-12 h-12 mx-auto border rounded-full border-white/40">
              💧
            </div>
            <p className="text-xs tracking-widest uppercase">Clean Label</p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-6 mt-12 text-xs tracking-widest text-center uppercase border-t border-white/10 text-white/40">
          © 2026 YÊN Detox Tea. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
