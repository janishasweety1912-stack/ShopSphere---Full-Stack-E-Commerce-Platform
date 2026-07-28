import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

function FlashSale(){

  const [time,setTime]=useState(7200);

  useEffect(()=>{

    const timer=setInterval(()=>{

      setTime((prev)=>prev>0?prev-1:0);

    },1000);

    return()=>clearInterval(timer);

  },[]);


  const hours=Math.floor(time/3600);
  const minutes=Math.floor((time%3600)/60);
  const seconds=time%60;


  return(
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-3xl p-6 sm:p-8 md:p-12 text-black flex flex-col md:flex-row items-center justify-between gap-8">


        <div className="text-center md:text-left">

          <p className="uppercase font-bold tracking-widest text-sm">
            Limited Time Offer
          </p>


          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            ⚡ Flash Sale
          </h2>


          <p className="text-lg mt-4 font-medium">
            Get amazing deals up to 60% OFF on trending products.
          </p>


          <Link
            to="/products"
            className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Shop Now →
          </Link>


        </div>



        <div className="bg-black/20 rounded-2xl px-5 sm:px-8 py-6 text-center">


          {
            time>0?
            (
              <>
                <p className="font-semibold mb-4">
                  Sale Ends In
                </p>


                <div className="flex gap-3 sm:gap-4 text-white">


                  <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
                    <h3 className="text-3xl font-bold">
                      {String(hours).padStart(2,"0")}
                    </h3>
                    <span className="text-xs">
                      Hours
                    </span>
                  </div>



                  <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
                    <h3 className="text-3xl font-bold">
                      {String(minutes).padStart(2,"0")}
                    </h3>
                    <span className="text-xs">
                      Minutes
                    </span>
                  </div>



                  <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
                    <h3 className="text-3xl font-bold">
                      {String(seconds).padStart(2,"0")}
                    </h3>
                    <span className="text-xs">
                      Seconds
                    </span>
                  </div>


                </div>

              </>
            )
            :
            (
              <h2 className="text-2xl font-bold text-white">
                🔥 Sale Ended
              </h2>
            )
          }


        </div>


      </div>


    </section>
  );
}

export default FlashSale;