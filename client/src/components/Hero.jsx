import { useEffect, useState } from "react";

const heroImages = [
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    title: "Latest Smartphones"
  },
  {
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
    title: "Powerful Laptops"
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900",
    title: "Trending Fashion"
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    title: "Stylish Shoes"
  },
  {
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900",
    title: "Modern Home Appliances"
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    title: "Premium Watches"
  },
  {
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900",
    title: "Explore New Books"
  },
  {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900",
    title: "Elegant Jewellery"
  },
  {
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900",
    title: "Beauty Products"
  },
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900",
    title: "Gaming Accessories"
  }
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === heroImages.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-0 flex items-center bg-gradient-to-br from-[#020617] via-blue-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-10 items-center">

        <div className="text-center md:text-left">
          <p className="text-cyan-400 uppercase tracking-widest font-semibold text-sm md:text-base">
            Welcome to ShopSphere
          </p>

          <h1 className="text-4xl sm:text-4xl md:text-7xl font-bold mt-4 leading-tight">
            Discover Amazing Products
          </h1>

          <p className="text-gray-300 text-base md:text-lg mt-6 max-w-xl mx-auto md:mx-0">
            Shop the latest technology, fashion, gaming and lifestyle
            products at the best prices with a futuristic shopping
            experience.
          </p>

          <button className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
            Shop Now
          </button>
        </div>

        <div className="flex justify-center">

          <div
            key={currentImage}
            className="relative bg-[#111827] border border-cyan-400/30 rounded-3xl p-4 md:p-6 shadow-2xl shadow-cyan-400/30 animate-fade"
          >
            <img
              src={heroImages[currentImage].image}
              alt={heroImages[currentImage].title}
              className="rounded-2xl w-[280px] sm:w-[350px] md:w-[450px] h-[280px] sm:h-[350px] md:h-[420px] object-cover"
            />

            <div className="absolute bottom-10 left-10 bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-cyan-400/30">
              <h2 className="text-xl font-bold text-cyan-400">
                {heroImages[currentImage].title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;