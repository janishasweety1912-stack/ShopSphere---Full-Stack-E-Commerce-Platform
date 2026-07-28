import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


function Footer(){

  return(

    <footer className="
    bg-[#020617]
    border-t
    border-cyan-400/20
    text-gray-300
    px-6
    py-14
    ">


      <div className="
      max-w-7xl
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-5
      gap-10
      ">



        {/* Brand */}

        <div className="lg:col-span-2">

          <h2 className="
          text-3xl
          font-bold
          text-cyan-400
          ">
            ShopSphere
          </h2>


          <p className="
          mt-4
          text-gray-400
          leading-relaxed
          max-w-sm
          ">
            Your ultimate shopping destination for fashion,
            electronics, lifestyle products and everything
            you love.
          </p>



          <div className="
          flex
          gap-4
          mt-6
          ">


            <a className="
            w-10
            h-10
            rounded-full
            bg-[#111827]
            flex
            items-center
            justify-center
            hover:text-cyan-400
            hover:border
            hover:border-cyan-400
            transition
            ">
              <FaFacebook/>
            </a>


            <a className="
            w-10
            h-10
            rounded-full
            bg-[#111827]
            flex
            items-center
            justify-center
            hover:text-cyan-400
            hover:border
            hover:border-cyan-400
            transition
            ">
              <FaInstagram/>
            </a>


            <a className="
            w-10
            h-10
            rounded-full
            bg-[#111827]
            flex
            items-center
            justify-center
            hover:text-cyan-400
            hover:border
            hover:border-cyan-400
            transition
            ">
              <FaTwitter/>
            </a>


            <a className="
            w-10
            h-10
            rounded-full
            bg-[#111827]
            flex
            items-center
            justify-center
            hover:text-cyan-400
            hover:border
            hover:border-cyan-400
            transition
            ">
              <FaYoutube/>
            </a>


          </div>

        </div>





        {/* Quick Links */}

        <div>

          <h3 className="
          text-xl
          font-bold
          text-white
          mb-5
          ">
            Quick Links
          </h3>


          <ul className="space-y-3">


            <li>
              <Link to="/" className="hover:text-cyan-400 transition">
                Home
              </Link>
            </li>


            <li>
              <Link to="/products" className="hover:text-cyan-400 transition">
                Products
              </Link>
            </li>


            <li>
              <Link to="/about" className="hover:text-cyan-400 transition">
                About Us
              </Link>
            </li>


            <li>
              <Link to="/cart" className="hover:text-cyan-400 transition">
                Cart
              </Link>
            </li>


          </ul>


        </div>






        {/* Categories */}

        <div>

          <h3 className="
          text-xl
          font-bold
          text-white
          mb-5
          ">
            Categories
          </h3>


          <ul className="space-y-3">


            <li className="hover:text-cyan-400 cursor-pointer">
              Fashion
            </li>

            <li className="hover:text-cyan-400 cursor-pointer">
              Electronics
            </li>

            <li className="hover:text-cyan-400 cursor-pointer">
              Beauty
            </li>

            <li className="hover:text-cyan-400 cursor-pointer">
              Furniture
            </li>


          </ul>


        </div>







        {/* Contact */}

        <div>


          <h3 className="
          text-xl
          font-bold
          text-white
          mb-5
          ">
            Contact
          </h3>



          <div className="
          flex
          gap-3
          mb-4
          text-sm
          ">

            <Mail size={18}
            className="text-cyan-400"/>

            <span>
              support@shopsphere.com
            </span>

          </div>




          <div className="
          flex
          gap-3
          mb-4
          text-sm
          ">

            <Phone size={18}
            className="text-cyan-400"/>

            <span>
              +91 98765 43210
            </span>

          </div>





          <div className="
          flex
          gap-3
          text-sm
          ">

            <MapPin size={18}
            className="text-cyan-400"/>

            <span>
              India
            </span>

          </div>



        </div>



      </div>







      {/* Bottom */}

      <div className="
      border-t
      border-gray-700
      mt-12
      pt-6
      flex
      flex-col
      md:flex-row
      justify-between
      gap-4
      text-center
      text-gray-500
      text-sm
      ">


        <p>
          © 2026 ShopSphere. All rights reserved.
        </p>


        <div className="flex justify-center gap-5">

          <Link 
            to="/privacy-policy"
            className="hover:text-cyan-400 cursor-pointer"
          >
            Privacy Policy
          </Link>


          <Link 
            to="/terms"
            className="hover:text-cyan-400 cursor-pointer"
          >
            Terms
          </Link>


          <Link 
            to="/refund-policy"
            className="hover:text-cyan-400 cursor-pointer"
          >
            Refund Policy
          </Link>

        </div>

      </div>



    </footer>

  );

}


export default Footer;