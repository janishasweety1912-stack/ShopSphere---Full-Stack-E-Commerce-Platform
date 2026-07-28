import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={40} />,
    title: "Free Delivery",
    description: "Free shipping on orders over ₹999"
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Secure Payment",
    description: "100% secure online payment"
  },
  {
    icon: <RotateCcw size={40} />,
    title: "Easy Returns",
    description: "7-day hassle-free returns"
  },
  {
    icon: <Headphones size={40} />,
    title: "24/7 Support",
    description: "We're here whenever you need help"
  }
];

function Features() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3 text-cyan-400">
          Why Choose ShopSphere?
        </h2>
        <p className="text-center text-gray-400 mt-3 mb-12 max-w-2xl mx-auto">
          Experience seamless shopping with secure payments,
          fast delivery and customer-first services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-cyan-400/20 rounded-2xl p-8 shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-2 transition-all duration-300 text-center group"
            >
              <div className="text-purple-500 flex justify-center mb-4 group-hover:text-cyan-400 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;