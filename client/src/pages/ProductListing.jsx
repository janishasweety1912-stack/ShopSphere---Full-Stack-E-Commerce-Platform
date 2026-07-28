import { useMemo,useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import products from "../data/products";

function ProductListing(){

  const { category,subCategory,occasion }=useParams();

  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("");
  const [brand,setBrand]=useState("");
  const [minRating,setMinRating]=useState(0);
  const [inStock,setInStock]=useState(false);
  const [maxPrice,setMaxPrice]=useState(5000);

  const resetFilters=()=>{
    setSearch("");
    setSort("");
    setBrand("");
    setMinRating(0);
    setInStock(false);
    setMaxPrice(5000);
  };

  const filteredProducts=useMemo(()=>{

    let result=[...products];

    if(category){
      result=result.filter(product=>
        product.category===category
      );
    }

    if(subCategory){

      result=result.filter(product=>
        product.subCategory===subCategory ||
        product.tags?.some(
          tag=>
          tag.toLowerCase().replaceAll(" ","-")===subCategory
        )
      );

    }

    if(occasion){

      result=result.filter(product=>
        product.occasion?.some(
          item=>
          item.toLowerCase().replaceAll(" ","-")===occasion
        )
      );

    }

    if(search){

      result=result.filter(product=>
        product.name
        .toLowerCase()
        .includes(search.toLowerCase())
      );

    }

    if(brand){

      result=result.filter(product=>
        product.brand
        .toLowerCase()
        .includes(brand.toLowerCase())
      );

    }

    result=result.filter(product=>
      product.price<=maxPrice
    );

    if(minRating>0){

      result=result.filter(product=>
        product.rating>=minRating
      );

    }

    if(inStock){

      result=result.filter(product=>
        product.stock>0
      );

    }

    if(sort==="low"){

      result=[...result].sort(
        (a,b)=>a.price-b.price
      );

    }

    if(sort==="high"){

      result=[...result].sort(
        (a,b)=>b.price-a.price
      );

    }

    if(sort==="rating"){

      result=[...result].sort(
        (a,b)=>b.rating-a.rating
      );

    }

    return result;

  },[
    category,
    subCategory,
    occasion,
    search,
    brand,
    maxPrice,
    minRating,
    inStock,
    sort
  ]);

  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-4 sm:p-6">

        <h1 className="text-2xl sm:text-4xl font-bold text-cyan-400 mb-8 capitalize">

          {
            occasion
            ?`${occasion.replace("-"," ")} Collection`
            :subCategory?.replace("-"," ")
          }

        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className="w-full">

            <ProductFilters
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              brand={brand}
              setBrand={setBrand}
              minRating={minRating}
              setMinRating={setMinRating}
              inStock={inStock}
              setInStock={setInStock}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
            />

          </div>

          <div className="lg:col-span-3 w-full">

            {
              filteredProducts.length>0?

              <div className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
                gap-4
                sm:gap-6
              ">

                {
                  filteredProducts.map(product=>(

                    <ProductCard
                      key={product.id}
                      product={product}
                    />

                  ))
                }

              </div>

              :

              <div className="text-center text-gray-400 text-xl mt-20">
                No products found.
              </div>

            }

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductListing;