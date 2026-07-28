import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Trash2,
  Edit,
  Plus
} from "lucide-react";
import AdminToast from "./AdminToast";

function AdminProducts(){

  const [products,setProducts]=useState([]);

  const [search,setSearch]=useState("");

  const [toast,setToast]=useState({
    message:"",
    type:""
  });



  const fetchProducts=async()=>{

    try{

      const response=await fetch(
        "https://shopsphere-full-stack-e-commerce-platform.onrender.com"
      );

      const data=await response.json();

      setProducts(data);


    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchProducts();

  },[]);




  const deleteProduct=async(id)=>{

    const confirmDelete=window.confirm(
      "Are you sure you want to delete this product?"
    );


    if(!confirmDelete) return;



    try{

      const token=localStorage.getItem(
        "adminToken"
      );


      const response=await fetch(
        `https://shopsphere-full-stack-e-commerce-platform.onrender.com${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );



      if(response.ok){


        fetchProducts();


        setToast({
          message:"Product deleted successfully",
          type:"success"
        });


      }else{


        setToast({
          message:"Failed to delete product",
          type:"error"
        });


      }



      setTimeout(()=>{

        setToast({
          message:"",
          type:""
        });

      },3000);



    }catch(error){


      setToast({
        message:"Something went wrong",
        type:"error"
      });


    }

  };





  const filteredProducts=products.filter((product)=>

    product.name
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

  );





  return(

    <>


      <AdminToast
        message={toast.message}
        type={toast.type}
      />



      <div className="
        min-h-screen
        bg-gradient-to-br
        from-[#020617]
        via-[#020617]
        to-purple-950/20
      ">



        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              Products
            </h1>


            <p className="
              text-gray-400
              mt-2
            ">
              Manage your ShopSphere products
            </p>


          </div>





          <Link

            to="/admin/add-product"

            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              text-[#020617]
              font-semibold
              hover:opacity-90
              transition
              shadow-[0_10px_30px_rgba(168,85,247,0.25)]
            "

          >

            <Plus size={20}/>

            Add Product

          </Link>


        </div>






        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-4
          mb-6
          flex
          items-center
          gap-3
        ">


          <Search
            size={20}
            className="text-purple-400"
          />



          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="
              w-full
              bg-transparent
              outline-none
              text-white
              placeholder:text-gray-500
            "

          />


        </div>







        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          overflow-hidden
          shadow-[0_10px_30px_rgba(168,85,247,0.12)]
        ">



        {
          filteredProducts.length===0 ? (


            <div className="
              py-16
              text-center
              text-gray-400
            ">

              No products available

            </div>



          ):(


            <div className="overflow-x-auto">


              <table className="w-full">


                <thead className="
                  bg-[#020617]
                  text-gray-400
                  text-sm
                ">


                  <tr>


                    <th className="p-5 text-left">
                      Image
                    </th>


                    <th className="p-5 text-left">
                      Product
                    </th>


                    <th className="p-5 text-left">
                      Brand
                    </th>


                    <th className="p-5 text-left">
                      Category
                    </th>


                    <th className="p-5 text-left">
                      Price
                    </th>


                    <th className="p-5 text-left">
                      Stock
                    </th>


                    <th className="p-5 text-left">
                      Actions
                    </th>


                  </tr>


                </thead>





                <tbody>


                {
                  filteredProducts.map((product)=>(


                    <tr

                      key={product._id}

                      className="
                        border-t
                        border-gray-800
                        hover:bg-white/5
                        transition
                      "

                    >



                      <td className="p-5">


                        <img

                          src={product.image}

                          alt={product.name}

                          className="
                            w-14
                            h-14
                            rounded-xl
                            object-cover
                          "

                        />


                      </td>





                      <td className="
                        p-5
                        text-white
                        font-medium
                      ">

                        {product.name}

                      </td>





                      <td className="
                        p-5
                        text-gray-300
                      ">

                        {product.brand || "-"}

                      </td>





                      <td className="
                        p-5
                        text-gray-300
                      ">

                        {product.category}

                      </td>





                      <td className="
                        p-5
                        text-cyan-400
                        font-semibold
                      ">

                        ₹{product.price}

                      </td>





                      <td className="
                        p-5
                        text-gray-300
                      ">

                        {product.stock}

                      </td>





                      <td className="p-5">


                        <div className="
                          flex
                          gap-3
                        ">



                          <Link

                            to={`/admin/edit-product/${product._id}`}

                            className="
                              w-9
                              h-9
                              rounded-lg
                              bg-purple-500/10
                              text-purple-400
                              hover:bg-purple-500/20
                              transition
                              flex
                              items-center
                              justify-center
                            "

                          >

                            <Edit size={18}/>

                          </Link>





                          <button

                            onClick={()=>
                              deleteProduct(product._id)
                            }

                            className="
                              w-9
                              h-9
                              rounded-lg
                              bg-red-500/10
                              text-red-400
                              hover:bg-red-500/20
                              transition
                              flex
                              items-center
                              justify-center
                            "

                          >

                            <Trash2 size={18}/>

                          </button>



                        </div>


                      </td>




                    </tr>


                  ))
                }


                </tbody>


              </table>


            </div>


          )
        }



        </div>



      </div>


    </>

  );

}


export default AdminProducts;