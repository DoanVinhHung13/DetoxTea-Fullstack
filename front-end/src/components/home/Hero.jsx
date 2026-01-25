import cuptea from "../../assets/images/home/cuptea.webp";
import mapvn from "../../assets/images/home/mapvn.png";
import herohome from "../../assets/images/home/tea-garden.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <section className="relative bg-cream">
      <div className="relative w-full h-80 md:h-[400px]  bg-cream ">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${herohome})`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content - Positioned at Top */}
        <div className="relative z-10 flex flex-col items-center h-full px-4 pt-12 text-center md:pt-16">
          <h6 className="mb-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            PREMIUM PRODUCT COLLECTION
          </h6>
          <p className="mb-8 text-base font-light text-white/90 md:text-lg">
            Discover The Best Products From Trusted Sellers Around The World
          </p>
          <button
            className="px-8 py-3 font-medium text-white transition-colors bg-[#8BA899] rounded-full hover:bg-[#486456]"
            onClick={() => (window.location.href = "/products")}
          >
            SHOP NOW
          </button>
        </div>

        {/* MIDDLE ELEMENT - Overlapping Product Image */}
        <div className="absolute bottom-0 z-20 -translate-x-1/2 translate-y-1/2 left-1/2">
          <div className="drop-shadow-2xl">
            <img
              src={cuptea}
              alt="Premium product"
              className="object-contain rounded-full w-[50vw] max-w-[480px] min-w-[160px]"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM PART - Hero Description Section */}
      <div className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="px-4 mx-auto max-w-7xl md:px-8">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#3D3528]">
                The Story of Our Marketplace
              </h3>
              <p className="text-[#6B5D52] leading-relaxed text-lg font-light">
                Handcrafted from the best suppliers worldwide, our premium
                collection offers a variety of quality products. We believe in
                delivering authentic value straight to your doorstep. Experience
                the craftsmanship and quality of premium products.
              </p>
              <button className="border-2 border-[#8BA899] text-[#8BA899] px-8 py-3 rounded-full font-medium hover:bg-[#8BA899] hover:text-white transition-colors">
                Read More
              </button>
            </div>

            {/* Right Column - Decorative Element */}
            <div className="items-center justify-center hidden pb-10 pl-20 md:flex">
              <div className="relative w-full h-80">
                <img
                  src={mapvn}
                  alt="Products showcase"
                  className="object-contain object-top -translate-y-10 w-100 h-100 md:w-120 md:h-120"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
