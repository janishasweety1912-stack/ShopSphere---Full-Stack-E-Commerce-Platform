import {
  FileText,
  UserCheck,
  ShoppingBag,
  CreditCard,
  Truck,
  Scale
} from "lucide-react";

import PolicyHeader from "../components/PolicyHeader";


const termsData = [
  {
    number:"01",
    icon:<FileText size={30}/>,
    title:"Product Information",
    text:"We provide accurate product details, prices and images. Minor variations may occur due to display settings or manufacturer updates.",
    color:"text-cyan-400"
  },
  {
    number:"02",
    icon:<UserCheck size={30}/>,
    title:"User Responsibilities",
    text:"Customers must provide correct information while creating accounts, making payments and placing orders.",
    color:"text-purple-400"
  },
  {
    number:"03",
    icon:<ShoppingBag size={30}/>,
    title:"Shopping Rules",
    text:"Users agree to follow ShopSphere purchase guidelines, payment procedures and delivery policies.",
    color:"text-green-400"
  },
  {
    number:"04",
    icon:<CreditCard size={30}/>,
    title:"Payment Terms",
    text:"All payments must be completed through the approved payment methods available on ShopSphere.",
    color:"text-pink-400"
  },
  {
    number:"05",
    icon:<Truck size={30}/>,
    title:"Delivery Policy",
    text:"Delivery times may vary depending on location, product availability and courier service conditions.",
    color:"text-orange-400"
  },
  {
    number:"06",
    icon:<Scale size={30}/>,
    title:"Legal Terms",
    text:"ShopSphere reserves the right to update policies, modify services and maintain platform security.",
    color:"text-blue-400"
  }
];


function Terms(){

  return(

    <section
      className="
      relative
      overflow-hidden
      min-h-screen
      bg-[#020617]
      text-gray-300
      px-6
      py-16
      "
    >


      <div className="
      absolute
      top-20
      left-10
      w-72
      h-72
      bg-purple-500/10
      blur-3xl
      rounded-full
      ">
      </div>


      <div className="
      absolute
      bottom-20
      right-10
      w-72
      h-72
      bg-cyan-500/10
      blur-3xl
      rounded-full
      ">
      </div>



      <div className="
      relative
      max-w-6xl
      mx-auto
      ">


        <PolicyHeader

          title="Terms & Conditions"

          description="Please read these terms carefully before using ShopSphere."

        />



        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
        ">


          {
            termsData.map((item,index)=>(


              <div
                key={index}
                className="
                relative
                bg-[#111827]
                border
                border-white/10
                rounded-3xl
                p-8
                overflow-hidden
                hover:border-purple-400/50
                hover:-translate-y-2
                hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
                transition-all
                duration-300
                "
              >


                <span className="
                absolute
                top-4
                right-6
                text-6xl
                font-bold
                text-white/5
                ">
                  {item.number}
                </span>



                <div className={`
                w-14
                h-14
                rounded-2xl
                bg-white/5
                flex
                items-center
                justify-center
                mb-6
                ${item.color}
                `}>
                  {item.icon}
                </div>



                <h2 className="
                text-2xl
                font-bold
                text-white
                mb-4
                ">
                  {item.title}
                </h2>



                <p className="
                text-gray-400
                leading-relaxed
                ">
                  {item.text}
                </p>
              </div>


            ))
          }


        </div>


      </div>


    </section>

  );

}


export default Terms;