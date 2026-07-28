import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Accessories(){
  const banners=[
    {
      title:"Premium Accessories",
      subtitle:"Complete your style with luxury accessories",
      image:"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561"
    },
    {
      title:"Trending Collections",
      subtitle:"Discover accessories that define your look",
      image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638"
    },
    {
      title:"New Arrivals",
      subtitle:"Latest accessories just arrived",
      image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
    }
  ];
  const sections=[
    {
      title:"Men's Accessories",
      items:[
        {name:"Watches",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d"},
        {name:"Wallets",image:"https://images.unsplash.com/photo-1627123424574-724758594e93"},
        {name:"Sunglasses",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083"},
        {name:"Belts",image:"https://images.unsplash.com/photo-1624222247344-550fb60583dc"}
      ]
    },
    {
      title:"Women's Accessories",
      items:[
        {name:"Handbags",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3"},
        {name:"Jewelry",image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"},
        {name:"Sunglasses",image:"https://images.unsplash.com/photo-1577803645773-f96470509666"},
        {name:"Watches",image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49"}
      ]
    },
    {
      title:"Lifestyle Accessories",
      items:[
        {name:"Backpacks",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62"},
        {name:"Caps",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b"},
        {name:"Perfumes",image:"https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc"},
        {name:"Travel Bags",image:"https://images.unsplash.com/photo-1553531384-cc64ac80f931"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="accessories"/>
      </div>
    </>
  );
}
export default Accessories;