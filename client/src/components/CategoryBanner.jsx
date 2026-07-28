import { useEffect,useState } from "react";

function CategoryBanner({banners}) {
  const [current,setCurrent]=useState(0);

  useEffect(()=>{
    const interval=setInterval(()=>{
      setCurrent((prev)=>(prev+1)%banners.length);
    },3000);

    return()=>clearInterval(interval);
  },[banners.length]);

  return(
    <div className="relative h-[280px] md:h-[520px] rounded-3xl overflow-hidden border border-cyan-400/20 shadow-xl shadow-cyan-400/20 mb-12">

      <img
        src={banners[current].image}
        alt={banners[current].title}
        className="w-full h-full object-cover transition duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/50 to-purple-900/40"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">

        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {banners[current].title}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl">
          {banners[current].subtitle}
        </p>

        <button className="mt-8 w-fit px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold rounded-xl hover:scale-105 transition">
          Shop Now
        </button>

      </div>


      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">

        {
          banners.map((_,index)=>(
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                current===index
                ?"bg-cyan-400"
                :"bg-gray-400"
              }`}
            />
          ))
        }

      </div>

    </div>
  );
}

export default CategoryBanner;