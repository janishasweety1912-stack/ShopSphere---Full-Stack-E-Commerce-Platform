import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductList(){

  const featuredProducts=products.filter(
    product=>product.trending && product.newArrival
  );

  return(
    <section className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-cyan-400">
        Featured Products
      </h2>

      <p className="text-gray-400 text-center mb-8">
        Handpicked products trending with our customers and worth adding to your cart
      </p>

      {
        featuredProducts.length>0?(
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">

            {
              featuredProducts.map((product,index)=>(

                <div
                  key={`${product.id || product._id}-${index}`}
                  className="relative"
                >

                  {
                    product.trending && product.newArrival ? (

                      <span className="
                        absolute 
                        top-3 
                        left-3
                        z-20
                        bg-gradient-to-r 
                        from-purple-500 
                        to-cyan-400
                        text-white
                        text-xs
                        font-bold
                        px-3
                        py-1
                        rounded-full
                        shadow-[0_0_15px_#22d3ee]
                        animate-pulse
                      ">
                        🔥Trending & ✨New
                      </span>

                    ) : product.trending ? (

                      <span className="
                        absolute
                        top-3
                        left-3
                        z-20
                        bg-purple-500
                        text-white
                        text-xs
                        font-bold
                        px-3
                        py-1
                        rounded-full
                        shadow-[0_0_15px_#a855f7]
                      ">
                        🔥 Trending
                      </span>

                    ) : (

                      <span className="
                        absolute
                        top-3
                        left-3
                        z-20
                        bg-cyan-400
                        text-black
                        text-xs
                        font-bold
                        px-3
                        py-1
                        rounded-full
                        shadow-[0_0_15px_#22d3ee]
                      ">
                        ✨ New Arrival
                      </span>

                    )
                  }


                  <ProductCard
                    product={product}
                  />


                </div>

              ))
            }

          </div>

        ) : (

          <div className="text-center text-gray-400 text-lg py-10">
            No featured products available.
          </div>

        )
      }

    </section>
  );
}

export default ProductList;