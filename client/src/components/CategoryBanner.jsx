import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryBanner({ banners, category }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[current];

  // --------------------------------------------------
  // Banner destination
  // --------------------------------------------------

  const bannerLink =
    currentBanner.link ||
    `/products/${category}`;

  return (
    <div
      className="
        relative
        w-full
        h-[420px]
        md:h-[500px]
        rounded-3xl
        overflow-hidden
        border
        border-cyan-400/20
        shadow-[0_0_30px_rgba(34,211,238,0.08)]
      "
    >
      {/* ==========================================
          BANNER IMAGE
      ========================================== */}

      <img
        src={currentBanner.image}
        alt={currentBanner.title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-all
          duration-700
        "
      />

      {/* ==========================================
          DARK OVERLAY
      ========================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#020617]/90
          via-[#020617]/55
          to-purple-900/40
        "
      />

      {/* ==========================================
          BANNER CONTENT
      ========================================== */}

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          justify-center
          px-8
          sm:px-10
          md:px-16
        "
      >
        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-bold
            text-white
            max-w-3xl
          "
        >
          {currentBanner.title}
        </h1>

        <p
          className="
            text-gray-300
            text-lg
            md:text-xl
            mt-4
            max-w-xl
          "
        >
          {currentBanner.subtitle}
        </p>

        {/* ==========================================
            SHOP NOW
        ========================================== */}

        <Link
          to={bannerLink}
          className="
            mt-8
            w-fit
            px-8
            py-3
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            text-black
            font-bold
            rounded-xl
            hover:scale-105
            hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
            transition-all
            duration-300
            inline-block
          "
        >
          Shop Now
        </Link>
      </div>

      {/* ==========================================
          SLIDER DOTS
      ========================================== */}

      <div
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex
          gap-3
          z-10
        "
      >
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to banner ${index + 1}`}
            className={`
              w-3
              h-3
              rounded-full
              transition-all
              duration-300
              ${
                current === index
                  ? "bg-cyan-400 scale-125"
                  : "bg-gray-400/70 hover:bg-gray-300"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryBanner;