import { Link } from "react-router-dom";

function CategorySection({ sections, category }) {

  return (
    <div className="max-w-7xl mx-auto mt-12 space-y-16">

      {
        sections.map((section,index)=>(

          <div key={index}>

            <div className="text-center mb-10">

              <div className="flex items-center justify-center gap-4">

                <div className="
                  h-[1px]
                  w-16
                  sm:w-24
                  bg-gradient-to-r
                  from-transparent
                  to-cyan-400
                "></div>


                <h2 className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-white
                  tracking-wide
                ">
                  {section.title}
                </h2>


                <div className="
                  h-[1px]
                  w-16
                  sm:w-24
                  bg-gradient-to-l
                  from-transparent
                  to-purple-500
                "></div>

              </div>


              <p className="
                text-gray-400
                mt-3
                text-sm
                sm:text-base
              ">
                Explore the latest {section.title.toLowerCase()} collection
              </p>


              <div className="
                flex
                justify-center
                items-center
                mt-5
              ">

                <span className="
                  bg-cyan-400/10
                  border
                  border-cyan-400/30
                  text-cyan-400
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                ">
                  {section.items.length} Products
                </span>

              </div>

            </div>


            <div className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              gap-6
              justify-items-center
            ">

              {
                section.items.map((item,itemIndex)=>(

                  <Link
                    key={itemIndex}
                    to={`/products/${category}/${item.name.toLowerCase().replace(/\s+/g,"-")}`}
                    className="
                      w-full
                      max-w-xs
                      bg-[#111827]
                      border
                      border-cyan-400/20
                      rounded-2xl
                      overflow-hidden
                      group
                      hover:border-cyan-400
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
                      hover:-translate-y-2
                      transition-all
                      duration-300
                    "
                  >

                    <div className="
                      h-44
                      overflow-hidden
                    ">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-110
                          transition
                          duration-500
                        "
                      />

                    </div>


                    <div className="
                      p-4
                      text-center
                    ">

                      <h3 className="
                        text-gray-200
                        font-semibold
                        group-hover:text-cyan-400
                        transition
                      ">
                        {item.name}
                      </h3>

                    </div>


                  </Link>

                ))
              }

            </div>


          </div>

        ))
      }

    </div>
  );
}

export default CategorySection;