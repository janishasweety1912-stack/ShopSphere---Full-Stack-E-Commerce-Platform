import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Beauty(){
  const banners=[
    {
      title:"Beauty Essentials",
      subtitle:"Enhance your beauty with premium products",
      image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    },
    {
      title:"Trending Beauty Products",
      subtitle:"Discover the latest beauty trends",
      image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"
    },
    {
      title:"Premium Care",
      subtitle:"Luxury care products for your lifestyle",
      image:"https://images.unsplash.com/photo-1612817288484-6f916006741a"
    }
  ];
  const sections=[
    {
      title:"Makeup",
      items:[
        {name:"Lipsticks",image:"https://images.unsplash.com/photo-1586495777744-4413f21062fa"},
        {name:"Foundation",image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348"},
        {name:"Eyeliner",image:"https://images.unsplash.com/photo-1631214524020-7e18db3f6d4f"},
        {name:"Blush",image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796"}
      ]
    },
    {
      title:"Skincare",
      items:[
        {name:"Face Wash",image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883"},
        {name:"Moisturizers",image:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b"},
        {name:"Sunscreen",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8"},
        {name:"Serums",image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be"}
      ]
    },
    {
      title:"Hair Care",
      items:[
        {name:"Shampoo",image:"https://images.unsplash.com/photo-1585232351009-aa87416fca90"},
        {name:"Hair Oil",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b"},
        {name:"Hair Styling",image:"https://images.unsplash.com/photo-1522337660859-02fbefca4702"},
        {name:"Hair Accessories",image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="beauty"/>
      </div>
    </>
  );
}
export default Beauty;