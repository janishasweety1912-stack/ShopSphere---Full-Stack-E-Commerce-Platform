const brands=[
  {
    name:"Apple",
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    name:"Nike",
    image:"https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
  },
  {
    name:"Adidas",
    image:"https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
  },
  {
    name:"Sony",
    image:"https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
  },
  {
    name:"Zara",
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg"
  },
  {
    name:"Dell",
    image:"https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg"
  },
  {
    name:"Philips",
    image:"https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg"
  },
  {
    name:"H&M",
    image:"https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
  },
  {
    name:"LG",
    image:"https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg"
  },
  {
    name:"IKEA",
    image:"https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg"
  },
  {
    name:"Microsoft",
    image:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name:"Asus",
    image:"https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg"
  },
  {
    name:"HP",
    image:"https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg"
  },
  {
    name:"Xiaomi",
    image:"https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg"
  },
  {
    name:"Lenovo",
    image:"https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg"
  },
];


function BrandShowcase(){

  return(
    <section className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-cyan-400">
        Popular Brands
      </h2>

      <p className="text-gray-400 text-center mb-8">
        Explore trusted brands that bring quality, innovation, and style together
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">

        {
          brands.map((brand,index)=>(

            <div
              key={index}
              className="
              bg-[#111827]
              border border-cyan-400/20
              rounded-2xl
              h-36
              flex
              flex-col
              items-center
              justify-center
              gap-3
              hover:border-cyan-400
              hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
              transition-all
              duration-300
              group
              "
            >

              <div
                className="
                w-20
                h-20
                flex
                items-center
                justify-center
                bg-white
                rounded-xl
                p-3
                "
              >

                <img
                  src={brand.image}
                  alt={brand.name}
                  className="
                  w-full
                  h-full
                  object-contain
                  group-hover:scale-110
                  transition
                  duration-300
                  "
                />

              </div>


              <h3
                className="
                text-gray-200
                font-semibold
                text-sm
                "
              >
                {brand.name}
              </h3>


            </div>

          ))
        }

      </div>

    </section>
  );
}


export default BrandShowcase;