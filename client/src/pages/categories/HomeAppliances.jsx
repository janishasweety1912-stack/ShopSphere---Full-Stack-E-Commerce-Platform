import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function HomeAppliances(){
  const banners=[
    {
      title:"Smart Home Solutions",
      subtitle:"Make your home smarter and comfortable",
      image:"https://images.unsplash.com/photo-1556911220-bff31c1a8e7e"
    },
    {
      title:"Modern Appliances",
      subtitle:"Upgrade your home with latest technology",
      image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
    },
    {
      title:"Premium Home Collection",
      subtitle:"Powerful appliances for modern living",
      image:"https://images.unsplash.com/photo-1556740749-887f6717d7e4"
    }
  ];
  const sections=[
    {
      title:"Kitchen Appliances",
      items:[
        {name:"Refrigerators",image:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5"},
        {name:"Washing Machines",image:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1"},
        {name:"Microwaves",image:"https://images.unsplash.com/photo-1585659722983-3a675dabf23d"},
        {name:"Mixers",image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b"}
      ]
    },
    {
      title:"Home Comfort",
      items:[
        {name:"Air Conditioners",image:"https://images.unsplash.com/photo-1631545806609-4c7c7f4f4f6e"},
        {name:"Fans",image:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4"},
        {name:"Vacuum Cleaners",image:"https://images.unsplash.com/photo-1558317374-067fb5f30001"},
        {name:"Water Purifiers",image:"https://images.unsplash.com/photo-1564419431636-7f3aeb2f7d6d"}
      ]
    },
    {
      title:"Smart Home",
      items:[
        {name:"Smart Lights",image:"https://images.unsplash.com/photo-1550989460-0adf9ea622e2"},
        {name:"Smart Speakers",image:"https://images.unsplash.com/photo-1589003077984-894e133dabab"},
        {name:"Security Cameras",image:"https://images.unsplash.com/photo-1557324232-b8917d3c3dcb"},
        {name:"Smart Devices",image:"https://images.unsplash.com/photo-1558002038-1055907df827"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="home-appliances"/>
      </div>
    </>
  );
}
export default HomeAppliances;