// Hero.jsx
import herohome from "../../assets/images/home/tea-garden.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    const productSection = document.getElementById("product-listing");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* UPPER HERO SECTION */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[100vh]">
        <div
          className="absolute inset-0 z-0 bg-top bg-cover"
          style={{ backgroundImage: `url(${herohome})` }}
        >
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 flex flex-col items-start justify-center h-full px-6 mx-auto lg:px-12">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-white leading-[1.1] drop-shadow-lg mb-6">
              Verdant Glow
            </h1>
            <p className="max-w-md mb-10 text-lg font-light leading-relaxed text-white md:text-xl opacity-90 drop-shadow-md">
              Awaken Your Inner Radiance <br className="hidden md:block" />
              Through Nature's Purest Detox.
            </p>
            <button
              onClick={scrollToProducts}
              className="px-12 py-4 bg-[#1E4D3B] text-white rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#15382B] transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>

      {/* LOWER DESCRIPTION SECTION */}
      <div className="relative pt-24 pb-24 bg-[#fdfbf7]">
        <div className="container px-6 mx-auto lg:px-16">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="order-2 space-y-8 lg:order-1">
              <div className="space-y-2">
                <h2 className="font-serif text-sm tracking-[0.3em] text-[#1E4D3B] uppercase font-bold">
                  Our Philosophy
                </h2>
                <h3 className="font-serif text-4xl md:text-5xl text-[#15382B] leading-tight">
                  The Story of <br />{" "}
                  <span className="italic">Pure Wellness</span>
                </h3>
              </div>
              <p className="text-[#333333]/80 leading-relaxed text-lg font-light max-w-xl">
                Born from ancient traditions and curated with modern wellness...
              </p>
              <button className="group flex items-center gap-4 font-bold text-xs tracking-[0.2em] text-[#1E4D3B] uppercase">
                <span>Explore Our Journal</span>
                <div className="w-12 h-[1px] bg-[#1E4D3B] transition-all group-hover:w-20"></div>
              </button>
            </div>

            <div className="relative flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md overflow-hidden transition-transform shadow-2xl aspect-square rounded-2xl rotate-2 hover:rotate-0">
                <img
                  src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1000&auto=format&fit=crop"
                  className="object-cover w-full h-full"
                  alt="Tea"
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
