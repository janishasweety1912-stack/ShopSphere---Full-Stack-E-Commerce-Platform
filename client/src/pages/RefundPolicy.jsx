import {
  RotateCcw,
  CreditCard,
  PackageCheck,
  XCircle,
  Clock,
  Repeat
} from "lucide-react";

import PolicyHeader from "../components/PolicyHeader";


const refundData = [
  {
    number:"01",
    icon:<RotateCcw size={30}/>,
    title:"Return Period",
    text:"Products can be returned within 7 days after delivery according to our return guidelines.",
    color:"text-cyan-400"
  },
  {
    number:"02",
    icon:<CreditCard size={30}/>,
    title:"Refund Process",
    text:"Approved refunds will be processed through the original payment method after verification.",
    color:"text-purple-400"
  },
  {
    number:"03",
    icon:<PackageCheck size={30}/>,
    title:"Product Conditions",
    text:"Products should be unused and returned with original packaging, accessories and invoice.",
    color:"text-green-400"
  },
  {
    number:"04",
    icon:<XCircle size={30}/>,
    title:"Non Refundable Items",
    text:"Used products, damaged items and personalized products may not qualify for refunds.",
    color:"text-red-400"
  },
  {
    number:"05",
    icon:<Clock size={30}/>,
    title:"Refund Timeline",
    text:"Refund processing time may take 5-7 business days depending on the payment provider.",
    color:"text-orange-400"
  },
  {
    number:"06",
    icon:<Repeat size={30}/>,
    title:"Exchange Policy",
    text:"Customers can request replacement for defective products according to exchange guidelines.",
    color:"text-blue-400"
  }
];


function RefundPolicy(){

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
      right-10
      w-72
      h-72
      bg-cyan-500/10
      blur-3xl
      rounded-full
      ">
      </div>


      <div className="
      absolute
      bottom-20
      left-10
      w-72
      h-72
      bg-purple-500/10
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

          title="Refund Policy"

          description="Simple and transparent return experience for our customers."

        />



        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
        ">


          {
            refundData.map((item,index)=>(


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


export default RefundPolicy;