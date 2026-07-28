import Navbar from "../components/Navbar";

function About(){
  return(
    <>
      <Navbar/>

      <div className="bg-[#020617] min-h-screen px-6 py-12">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">

            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">
              About ShopSphere
            </h1>

            <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
              ShopSphere is a modern e-commerce platform designed to provide
              a smooth and enjoyable online shopping experience with quality
              products, easy navigation, and secure ordering.
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-8">


            <div className="bg-[#111827] border border-cyan-400/20 rounded-2xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Our Mission
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Our mission is to create a simple, fast, and user-friendly
                shopping platform where customers can discover products,
                compare choices, and complete purchases easily.
              </p>

            </div>


            <div className="bg-[#111827] border border-purple-500/20 rounded-2xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                Why Choose Us?
              </h2>

              <ul className="text-gray-300 space-y-3">

                <li>
                  ✓ Wide range of product categories
                </li>

                <li>
                  ✓ Easy cart and checkout experience
                </li>

                <li>
                  ✓ Modern and responsive design
                </li>

                <li>
                  ✓ Customer-focused shopping experience
                </li>

              </ul>

            </div>


          </div>


          <div className="mt-10 bg-[#111827] border border-cyan-400/20 rounded-2xl p-8 text-center">

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Built With Modern Technology
            </h2>

            <p className="text-gray-300">
              ShopSphere is developed using React.js, Tailwind CSS,
              JavaScript, and modern web development practices to deliver
              a fast and interactive user experience.
            </p>

          </div>


        </div>

      </div>
    </>
  );
}

export default About;