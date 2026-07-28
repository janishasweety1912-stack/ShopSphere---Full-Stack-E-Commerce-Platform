import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import AdminToast from "./AdminToast";

function AddProduct(){

  const navigate=useNavigate();

  const [toast,setToast]=useState({
    message:"",
    type:""
  });


  const [product,setProduct]=useState({
    name:"",
    brand:"",
    category:"",
    subCategory:"",
    price:"",
    discount:"",
    stock:"",
    rating:"",
    image:"",
    description:""
  });



  const handleChange=(e)=>{

    setProduct({
      ...product,
      [e.target.name]:e.target.value
    });

  };





  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      const token=localStorage.getItem("adminToken");


      const response=await fetch(
        "http://https://shopsphere-full-stack-e-commerce-platform.onrender.com",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify(product)
        }
      );


      const data=await response.json();



      if(response.ok){


        setToast({
          message:"Product added successfully",
          type:"success"
        });


        setTimeout(()=>{

          navigate("/admin/products");

        },1500);


      }else{


        setToast({
          message:data.message || "Failed to add product",
          type:"error"
        });


      }


    }catch(error){


      setToast({
        message:"Something went wrong",
        type:"error"
      });


    }

  };





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


        <div className="mb-8">

          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            Add Product
          </h1>


          <p className="
            text-gray-400
            mt-2
          ">
            Add new products to ShopSphere
          </p>


        </div>





        <form
          onSubmit={handleSubmit}
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-6
            shadow-[0_10px_30px_rgba(168,85,247,0.15)]
          "
        >


          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">


          {
            [
              ["name","Product Name"],
              ["brand","Brand"],
              ["category","Category"],
              ["subCategory","Sub Category"],
              ["price","Price"],
              ["discount","Discount"],
              ["stock","Stock"],
              ["rating","Rating"],
              ["image","Image URL"]
            ].map((field,index)=>(

              <div key={index}>


                <label className="
                  text-gray-300
                  text-sm
                  mb-2
                  block
                ">
                  {field[1]}
                </label>


                <input

                  type="text"

                  name={field[0]}

                  value={product[field[0]]}

                  onChange={handleChange}

                  placeholder={`Enter ${field[1]}`}

                  className="
                    w-full
                    bg-[#020617]
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-cyan-400
                    transition
                  "

                />


              </div>


            ))
          }


          </div>





          <div className="mt-6">


            <label className="
              text-gray-300
              text-sm
              mb-2
              block
            ">
              Description
            </label>


            <textarea

              name="description"

              value={product.description}

              onChange={handleChange}

              rows="5"

              placeholder="Enter product description"

              className="
                w-full
                bg-[#020617]
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-purple-400
              "

            />


          </div>





          <button

            type="submit"

            className="
              mt-8
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              text-[#020617]
              font-bold
              hover:opacity-90
              transition
            "

          >

            <Save size={20}/>

            Save Product

          </button>



        </form>


      </div>


    </>

  );

}


export default AddProduct;