import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Furniture(){
  const banners=[
    {
      title:"Modern Furniture",
      subtitle:"Transform your space with stylish designs",
      image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
    },
    {
      title:"Home Makeover",
      subtitle:"Create beautiful interiors for your home",
      image:"https://images.unsplash.com/photo-1618220179428-22790b461013"
    },
    {
      title:"Premium Interiors",
      subtitle:"Luxury furniture for modern homes",
      image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
    }
  ];
  const sections=[
    {
      title:"Living Room",
      items:[
        {name:"Sofas",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc"},
        {name:"Coffee Tables",image:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e"},
        {name:"TV Units",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"},
        {name:"Recliners",image:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91"}
      ]
    },
    {
      title:"Bedroom",
      items:[
        {name:"Beds",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"},
        {name:"Wardrobes",image:"https://images.unsplash.com/photo-1595428774223-ef52624120d2"},
        {name:"Dressers",image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7"},
        {name:"Side Tables",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"}
      ]
    },
    {
      title:"Office Furniture",
      items:[
        {name:"Office Chairs",image:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8"},
        {name:"Desks",image:"https://images.unsplash.com/photo-1497215842964-222b430dc094"},
        {name:"Bookshelves",image:"https://images.unsplash.com/photo-1594620302200-9a762244a156"},
        {name:"Cabinets",image:"https://images.unsplash.com/photo-1558997519-83ea9252edf8"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="furniture"/>
      </div>
    </>
  );
}
export default Furniture;