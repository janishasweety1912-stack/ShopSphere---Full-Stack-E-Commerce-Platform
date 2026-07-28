import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function PolicyHeader({title,description}){

  return(
    <>

      <Link
        to="/"
        className="
        inline-flex
        items-center
        gap-2
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        px-5
        py-2.5
        rounded-xl
        font-semibold
        hover:scale-105
        shadow-lg
        shadow-purple-500/20
        transition-all
        duration-300
        mb-10
        "
      >

        <ArrowLeft size={18}/>

        Back To Home

      </Link>



      <div className="
      text-center
      mb-14
      ">


        <h1
        className="
        text-4xl
        sm:text-5xl
        font-bold
        bg-gradient-to-r
        from-cyan-400
        via-purple-400
        to-pink-400
        text-transparent
        bg-clip-text
        mb-5
        "
        >

          {title}

        </h1>


        <p className="
        text-gray-400
        max-w-2xl
        mx-auto
        leading-relaxed
        ">

          {description}

        </p>


        <div className="
        w-32
        h-1
        bg-gradient-to-r
        from-cyan-400
        to-purple-500
        mx-auto
        mt-6
        rounded-full
        ">
        </div>


        <p className="
        text-gray-500
        text-sm
        mt-5
        ">

        Last Updated: July 2026

        </p>


      </div>


    </>
  );

}


export default PolicyHeader;