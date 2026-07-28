import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products(){

  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("all");

  const categories=[
    "all",
    "fashion",
    "footwear",
    "accessories",
    "mobiles",
    "electronics"
  ];

  const filteredProducts=products.filter(product=>{

    const searchMatch=product.name.toLowerCase().includes(search.toLowerCase());

    const categoryMatch=
      category==="all" ||
      product.category===category;

    return searchMatch && categoryMatch;

  });

  return(
    <>
      <Navbar/>

      <div className="bg-[#020617] min-h-screen px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
            All Products
          </h1>


          <div className="flex flex-col sm:flex-row gap-5 mb-8">


            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="flex-1 bg-[#111827] border border-cyan-400/20 rounded-xl px-5 py-3 text-white outline-none focus:border-cyan-400"
            />


            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="bg-[#111827] border border-cyan-400/20 rounded-xl px-5 py-3 text-white outline-none"
            >

              {
                categories.map(item=>(

                  <option
                    key={item}
                    value={item}
                    className="bg-[#111827]"
                  >
                    {item.toUpperCase()}
                  </option>

                ))
              }

            </select>


          </div>


          {
            filteredProducts.length===0 ?

            (
              <p className="text-gray-400 text-center text-xl">
                No products found
              </p>
            )

            :

            (

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

                {
                  filteredProducts.map(product=>(

                    <ProductCard
                      key={product.id}
                      product={product}
                    />

                  ))
                }

              </div>

            )

          }


        </div>

      </div>

    </>
  );
}

export default Products;