import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import productsData from "../data/products";

function NewArrivals(){

  const [newProducts,setNewProducts]=useState([]);

  useEffect(()=>{

    const latest=[...productsData]
      .slice(-4)
      .reverse();

    setNewProducts(latest);

  },[]);

  return(
    <section className="bg-[#020617] py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-cyan-400">
          New Arrivals
        </h2>

        <p className="text-gray-400 text-center mb-10">
          Discover the latest products added to our collection
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">

          {
            newProducts.map(product=>(

              <div
                key={product.id}
                className="relative"
              >

                <span className="absolute top-3 left-3 z-10 bg-cyan-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                  ✨ New
                </span>

                <ProductCard
                  product={product}
                />

              </div>

            ))
          }

        </div>

        <div className="flex justify-center mt-12">

          <Link
            to="/products"
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            View All Products →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default NewArrivals;