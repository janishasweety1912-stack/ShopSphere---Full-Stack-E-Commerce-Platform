import {
  ShieldCheck,
  Database,
  Lock,
  UserRoundCheck,
  Cookie,
  Share2
} from "lucide-react";

import PolicyHeader from "../components/PolicyHeader";


const privacyData = [
  {
    number:"01",
    icon:<ShieldCheck size={30}/>,
    title:"Information We Collect",
    text:"We collect details such as name, email, contact information, delivery address and order history to provide better services and improve your shopping experience.",
    color:"text-cyan-400"
  },
  {
    number:"02",
    icon:<Database size={30}/>,
    title:"How We Use Information",
    text:"Your information helps us process orders, manage accounts, provide customer support and enhance ShopSphere services.",
    color:"text-purple-400"
  },
  {
    number:"03",
    icon:<Lock size={30}/>,
    title:"Data Security",
    text:"We follow secure practices to protect your personal information from unauthorized access, misuse or disclosure.",
    color:"text-green-400"
  },
  {
    number:"04",
    icon:<UserRoundCheck size={30}/>,
    title:"Account Protection",
    text:"Customers are responsible for keeping their account credentials secure and should not share login information with others.",
    color:"text-pink-400"
  },
  {
    number:"05",
    icon:<Cookie size={30}/>,
    title:"Cookies & Tracking",
    text:"ShopSphere uses cookies to improve website performance, remember preferences and provide a better browsing experience.",
    color:"text-orange-400"
  },
  {
    number:"06",
    icon:<Share2 size={30}/>,
    title:"Information Sharing",
    text:"We do not sell your personal information. Data may only be shared with trusted services required for payments, delivery and support.",
    color:"text-blue-400"
  }
];


function PrivacyPolicy(){

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


      <div
        className="
        absolute
        top-20
        left-10
        w-72
        h-72
        bg-cyan-500/10
        blur-3xl
        rounded-full
        "
      >
      </div>


      <div
        className="
        absolute
        bottom-20
        right-10
        w-72
        h-72
        bg-purple-500/10
        blur-3xl
        rounded-full
        "
      >
      </div>



      <div
        className="
        relative
        max-w-6xl
        mx-auto
        "
      >


        <PolicyHeader

          title="Privacy Policy"

          description="Your privacy matters to us. Learn how ShopSphere protects and manages your personal information."

        />



        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
          "
        >


          {
            privacyData.map((item,index)=>(


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


                <span
                  className="
                  absolute
                  top-4
                  right-6
                  text-6xl
                  font-bold
                  text-white/5
                  "
                >

                  {item.number}

                </span>



                <div
                  className={`
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  mb-6
                  ${item.color}
                  `}
                >

                  {item.icon}

                </div>



                <h2
                  className="
                  text-2xl
                  font-bold
                  text-white
                  mb-4
                  "
                >

                  {item.title}

                </h2>



                <p
                  className="
                  text-gray-400
                  leading-relaxed
                  "
                >

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


export default PrivacyPolicy;