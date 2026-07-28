import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Electronics(){
  const banners=[
    {
      title:"Smart Electronics",
      subtitle:"Upgrade your lifestyle with latest technology",
      image:"https://images.unsplash.com/photo-1498049794561-7780e7231661"
    },
    {
      title:"Latest Gadgets",
      subtitle:"Explore innovative devices and accessories",
      image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      title:"Premium Technology",
      subtitle:"Powerful devices for modern living",
      image:"https://images.unsplash.com/photo-1550009158-9ebf69173e03"
    }
  ];
  const sections=[
    {
      title:"Computers & Laptops",
      items:[
        {name:"Laptops",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"},
        {name:"Monitors",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"},
        {name:"Keyboards",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3"},
        {name:"Mouse",image:"https://images.unsplash.com/photo-1527814050087-3793815479db"}
      ]
    },
    {
      title:"Home Electronics",
      items:[
        {name:"Televisions",image:"https://images.unsplash.com/photo-1593784991095-a205069470b6"},
        {name:"Speakers",image:"https://images.unsplash.com/photo-1545454675-3531b543be5d"},
        {name:"Cameras",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32"},
        {name:"Smart Watches",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"}
      ]
    },
    {
      title:"Gaming",
      items:[
        {name:"Gaming Consoles",image:"https://images.unsplash.com/photo-1605901309584-818e25960a8f"},
        {name:"Gaming Accessories",image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575"},
        {name:"Gaming Chairs",image:"https://images.unsplash.com/photo-1598550476439-6847785fcea6"},
        {name:"VR Devices",image:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="electronics"/>
      </div>
    </>
  );
}
export default Electronics;