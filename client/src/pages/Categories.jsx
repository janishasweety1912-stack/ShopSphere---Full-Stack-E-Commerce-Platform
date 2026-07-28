import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Smartphone,
  Laptop,
  Shirt,
  BookOpen,
  Sparkles,
  Home,
  ToyBrick,
  Dumbbell,
  Sofa,
  Gem,
  Footprints
} from "lucide-react";

const categories=[
  {
    name:"Fashion",
    path:"/fashion",
    icon:<Shirt size={36}/>
  },
  {
    name:"Footwear",
    path:"/footwear",
    icon:<Footprints size={36}/>
  },
  {
    name:"Accessories",
    path:"/accessories",
    icon:<Gem size={36}/>
  },
  {
    name:"Mobiles",
    path:"/mobiles",
    icon:<Smartphone size={36}/>
  },
  {
    name:"Electronics",
    path:"/electronics",
    icon:<Laptop size={36}/>
  },
  {
    name:"Beauty",
    path:"/beauty",
    icon:<Sparkles size={36}/>
  },
  {
    name:"Home Appliances",
    path:"/home-appliances",
    icon:<Home size={36}/>
  },
  {
    name:"Toys",
    path:"/toys",
    icon:<ToyBrick size={36}/>
  },
  {
    name:"Sports & Fitness",
    path:"/sports-fitness",
    icon:<Dumbbell size={36}/>
  },
  {
    name:"Furniture",
    path:"/furniture",
    icon:<Sofa size={36}/>
  },
  {
    name:"Books",
    path:"/books",
    icon:<BookOpen size={36}/>
  }
];

function Categories(){
  return(
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto py-14 px-6">

        <h2 className="text-4xl font-bold text-center mb-10 text-cyan-400">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

          {
            categories.map((category,index)=>(

              <Link
                key={index}
                to={category.path}
                className="bg-[#111827] border border-cyan-400/20 rounded-2xl shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer p-6 flex flex-col items-center group"
              >

                <div className="text-purple-500 mb-4 group-hover:text-cyan-400 transition">
                  {category.icon}
                </div>

                <h3 className="font-semibold text-gray-200 group-hover:text-cyan-400 transition text-center">
                  {category.name}
                </h3>

              </Link>

            ))
          }

        </div>

      </section>
    </>
  );
}

export default Categories;