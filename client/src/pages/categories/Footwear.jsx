import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Footwear(){
  const banners=[
    {
      title:"New Season Footwear",
      subtitle:"Step into comfort and style",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      title:"Trending Sneakers",
      subtitle:"Latest sneaker collections for everyone",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
    },
    {
      title:"Premium Collection",
      subtitle:"Luxury footwear for every occasion",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
    }
  ];
  const sections=[
    {
      title:"Men's Footwear",
      items:[
        {name:"Sneakers",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"},
        {name:"Sports Shoes",image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2"},
        {name:"Formal Shoes",image:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000"},
        {name:"Sandals",image:"https://images.unsplash.com/photo-1603487742131-4160ec999306"}
      ]
    },
    {
      title:"Women's Footwear",
      items:[
        {name:"Heels",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2"},
        {name:"Flats",image:"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111"},
        {name:"Sneakers",image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3"},
        {name:"Boots",image:"https://images.unsplash.com/photo-1544966503-7cc5ac882d5f"}
      ]
    },
    {
      title:"Kids Footwear",
      items:[
        {name:"School Shoes",image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782"},
        {name:"Sports Shoes",image:"https://images.unsplash.com/photo-1552346154-21d32810aba3"},
        {name:"Casual Shoes",image:"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111"},
        {name:"Sandals",image:"https://images.unsplash.com/photo-1603487742131-4160ec999306"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="footwear"/>
      </div>
    </>
  );
}
export default Footwear;