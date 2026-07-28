import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Mobiles(){
  const banners=[
    {
      title:"Latest Smartphones",
      subtitle:"Experience the power of next generation devices",
      image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      title:"Flagship Phones",
      subtitle:"Premium performance with advanced technology",
      image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    },
    {
      title:"New Launches",
      subtitle:"Discover the latest mobile innovations",
      image:"https://images.unsplash.com/photo-1556656793-08538906a9f8"
    }
  ];
  const sections=[
    {
      title:"Smartphones",
      items:[
        {name:"iPhone",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab"},
        {name:"Samsung",image:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"},
        {name:"OnePlus",image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97"},
        {name:"Google Pixel",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"}
      ]
    },
    {
      title:"Budget Mobiles",
      items:[
        {name:"Redmi",image:"https://images.unsplash.com/photo-1565849904461-04a58ad377e0"},
        {name:"Realme",image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97"},
        {name:"Poco",image:"https://images.unsplash.com/photo-1556656793-08538906a9f8"},
        {name:"Motorola",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"}
      ]
    },
    {
      title:"Mobile Accessories",
      items:[
        {name:"Chargers",image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0"},
        {name:"Earbuds",image:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"},
        {name:"Covers",image:"https://images.unsplash.com/photo-1601593346740-925612772716"},
        {name:"Screen Protectors",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="mobiles"/>
      </div>
    </>
  );
}
export default Mobiles;