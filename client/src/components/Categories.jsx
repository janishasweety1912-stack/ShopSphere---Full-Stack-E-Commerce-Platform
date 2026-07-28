import { Link } from "react-router-dom";
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
    icon:<Shirt size={32}/>
  },
  {
    name:"Footwear",
    path:"/footwear",
    icon:<Footprints size={32}/>
  },
  {
    name:"Accessories",
    path:"/accessories",
    icon:<Gem size={32}/>
  },
  {
    name:"Mobiles",
    path:"/mobiles",
    icon:<Smartphone size={32}/>
  },
  {
    name:"Electronics",
    path:"/electronics",
    icon:<Laptop size={32}/>
  },
  {
    name:"Beauty",
    path:"/beauty",
    icon:<Sparkles size={32}/>
  },
  {
    name:"Home Appliances",
    path:"/home-appliances",
    icon:<Home size={32}/>
  },
  {
    name:"Toys",
    path:"/toys",
    icon:<ToyBrick size={32}/>
  },
  {
    name:"Sports & Fitness",
    path:"/sports-fitness",
    icon:<Dumbbell size={32}/>
  },
  {
    name:"Furniture",
    path:"/furniture",
    icon:<Sofa size={32}/>
  },
  {
    name:"Books",
    path:"/books",
    icon:<BookOpen size={32}/>
  }
];

function Categories(){
  return(
    <section className="max-w-7xl mx-auto py-14 px-6">
      <h2 className="text-4xl font-bold text-center mb-3 text-cyan-400">
        Shop by Category
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Discover everything you need across fashion, electronics, lifestyle, and more
      </p>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {categories.map((category,index)=>(
          <Link
            key={index}
            to={category.path}
            className="min-w-[180px] bg-[#111827] border border-cyan-400/20 rounded-2xl shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer p-8 flex flex-col items-center group"
          >
            <div className="text-purple-500 mb-4 group-hover:text-cyan-400 transition">
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-200 group-hover:text-cyan-400 transition whitespace-nowrap text-center">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;