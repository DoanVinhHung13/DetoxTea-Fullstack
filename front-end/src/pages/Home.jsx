// Home.jsx
import Features from "../components/home/features";
import GiftSet from "../components/home/gift-set";
import Header from "../components/home/Header/HeaderHomePage";
import Hero from "../components/home/Hero";
import NewsSection from "../components/home/news-section";
import TeaQuiz from "../components/home/tea-quiz";
import WellnessHomepage from "../components/home/WellnessHomepage";

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
      <footer className="bg-[#1E4D3B] text-white py-16">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center justify-between pb-12 mb-12 border-b md:flex-row border-white/10">
            <div className="max-w-md mb-8 text-center md:text-left md:mb-0">
              <p className="font-serif text-2xl">
                Tham gia Verdant Glow Circle để nhận ưu đãi độc quyền.
              </p>
            </div>
            <div className="flex w-full max-w-md p-1 bg-white rounded-full md:w-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full outline-none focus:ring-0"
              />
              <button className="bg-[#1E4D3B] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#15382B] transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 uppercase tracking-[0.2em]">
            © 2026 Verdant Glow. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
