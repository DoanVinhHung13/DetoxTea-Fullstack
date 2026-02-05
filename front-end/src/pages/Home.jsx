// Home.jsx
import Features from "../components/home/features";
import GiftSet from "../components/home/gift-set";
import Header from "../components/home/Header/HeaderHomePage";
import Hero from "../components/home/Hero";
import NewsSection from "../components/home/news-section";
import TeaQuiz from "../components/home/tea-quiz";
import WellnessHomepage from "../components/home/WellnessHomepage";
import logoTrang from "../assets/images/home/logo-trang.png";

const Home = () => {
  return (
    <div className="bg-[#fdfbf7] font-sans text-[#333333] antialiased">
      <Header />

      <main>
        <Hero />
        <div id="product-listing">
          <GiftSet />
          <NewsSection />
          <TeaQuiz />
          <WellnessHomepage />
          <Features />
        </div>
      </main>

      {/* Footer */}

<footer className="bg-[#1E4D3B] text-white pt-20 pb-10">
  <div className="container px-6 mx-auto">

    {/* GRID */}
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">

      {/* LOGO + BRAND */}
      <div className="lg:col-span-2 space-y-4">
        <img
          src={logoTrang}
          alt="YÊN Detox Tea"
          className="h-16 w-auto"
        />

        <p className="text-sm text-white/70 leading-relaxed max-w-xs">
          YÊN trân quý những lá trà Lâm Đồng lỡ hẹn với vẻ ngoài hoàn hảo.
          Chúng tôi chắt chiu tinh túy ấy để tạo nên dòng detox nguyên bản.
        </p>
      </div>

      {/* COLUMN 1 - SỨ MỆNH */}
      <div>
        <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest">
          Sứ mệnh
        </h4>

        <p className="text-sm text-white/70 leading-relaxed">
          Hồi sinh những lá trà bị bỏ lỡ, mang chất trà thật đến với
          những tâm hồn trân trọng giá trị nội tại.
        </p>
      </div>

      {/* COLUMN 2 - SẢN PHẨM */}
      <div>
        <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest">
          Sản phẩm theo gu
        </h4>

        <ul className="space-y-3 text-white/70 text-sm">
          <li className="hover:text-white cursor-pointer">
            Sương Mai - Thanh nhẹ
          </li>
          <li className="hover:text-white cursor-pointer">
            Nhã Hương - Thơm dịu
          </li>
          <li className="hover:text-white cursor-pointer">
            Tỉnh Sắc - Đậm vị
          </li>
          <li className="hover:text-white cursor-pointer">
            Hộp quà Tết
          </li>
        </ul>
      </div>

      {/* COLUMN 3 - MINH BẠCH */}
      <div>
        <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest">
          Sự minh bạch
        </h4>

        <ul className="space-y-3 text-white/70 text-sm">
          <li className="hover:text-white cursor-pointer">
            Hành trình trà từ Lâm Đồng
          </li>
          <li className="hover:text-white cursor-pointer">
            Vẻ đẹp "Trà lệch chuẩn"
          </li>
          <li className="hover:text-white cursor-pointer">
            Nghệ thuật pha trà
          </li>
        </ul>
      </div>

      {/* NEWSLETTER + CONTACT */}
      <div className="space-y-6">

        <div>
          <h4 className="font-semibold mb-3 uppercase text-sm tracking-widest">
            Nhận ưu đãi
          </h4>

          <div className="flex">
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-white/50"
            />
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <p className="font-semibold mb-2 uppercase text-sm tracking-widest">
            Kết nối
          </p>

          <p className="text-sm text-white/70">
            (+84) 271 837 323
          </p>
          <p className="text-sm text-white/70">
            yen.detox@gmail.com
          </p>
        </div>

        {/* SOCIAL */}
        <div className="flex gap-4">
          <div className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#1E4D3B] cursor-pointer transition">
            f
          </div>
          <div className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#1E4D3B] cursor-pointer transition">
            in
          </div>
          <div className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#1E4D3B] cursor-pointer transition">
            yt
          </div>
        </div>

      </div>
    </div>

    {/* BRAND VALUE STRIP */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 pt-12 border-t border-white/10 text-center">

      <div className="space-y-3">
        <div className="w-12 h-12 mx-auto border border-white/40 rounded-full flex items-center justify-center">
          🍃
        </div>
        <p className="text-xs uppercase tracking-widest">
          100% Trà thật
        </p>
      </div>

      <div className="space-y-3">
        <div className="w-12 h-12 mx-auto border border-white/40 rounded-full flex items-center justify-center">
          ♻
        </div>
        <p className="text-xs uppercase tracking-widest">
          Hồi sinh trà Việt
        </p>
      </div>

      <div className="space-y-3">
        <div className="w-12 h-12 mx-auto border border-white/40 rounded-full flex items-center justify-center">
          💧
        </div>
        <p className="text-xs uppercase tracking-widest">
          Clean Label
        </p>
      </div>

    </div>

    {/* COPYRIGHT */}
    <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40 tracking-widest uppercase">
      © 2026 YÊN Detox Tea. All Rights Reserved.
    </div>

  </div>
</footer>


    </div>
  );
};

export default Home;
