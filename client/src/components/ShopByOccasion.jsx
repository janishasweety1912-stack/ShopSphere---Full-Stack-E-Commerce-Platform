import { Link } from "react-router-dom";

const occasions=[
  {
    name:"Festival",
    image:"https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=600",
    occasion:"Festival"
  },
  {
    name:"Wedding",
    image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    occasion:"Wedding"
  },
  {
    name:"Office Wear",
    image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    occasion:"Office Wear"
  },
  {
    name:"Casual Wear",
    image:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600",
    occasion:"Casual Wear"
  },
  {
    name:"Gifts",
    image:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600",
    occasion:"Gifts"
  }
];


function ShopByOccasion(){

  return(
    <section className="bg-[#020617] py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-cyan-400">
          Shop By Occasion
        </h2>

        <p className="text-gray-400 text-center mb-10">
          Find the perfect style for every special moment
        </p>


        <div className="flex gap-6 overflow-x-auto pb-5 scrollbar-hide">

          {
            occasions.map((item,index)=>(

              <Link
                key={index}
                to={`/occasion/${item.occasion}`}
                className="min-w-[220px] sm:min-w-[250px] h-[300px] rounded-3xl overflow-hidden relative group border border-cyan-400/20 hover:border-cyan-400 transition"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-end pb-7">


                  <h3 className="text-2xl font-bold text-white">
                    {item.name}
                  </h3>


                  <button className="mt-3 bg-cyan-400 text-black px-5 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition">
                    Explore →
                  </button>


                </div>


              </Link>

            ))
          }

        </div>


      </div>


    </section>
  );
}

export default ShopByOccasion;