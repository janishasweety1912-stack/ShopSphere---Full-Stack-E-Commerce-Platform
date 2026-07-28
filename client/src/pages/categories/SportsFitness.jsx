import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function SportsFitness(){
  const banners=[
    {
      title:"Fitness Revolution",
      subtitle:"Build strength and stay active every day",
      image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
    },
    {
      title:"Sports Essentials",
      subtitle:"Everything you need for your favourite sports",
      image:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    },
    {
      title:"Active Lifestyle",
      subtitle:"Gear up for a healthier lifestyle",
      image:"https://images.unsplash.com/photo-1538805060514-97d9cc17730c"
    }
  ];
  const sections=[
    {
      title:"Fitness Equipment",
      items:[
        {name:"Dumbbells",image:"https://images.unsplash.com/photo-1517963879433-6ad2b056d712"},
        {name:"Yoga Mats",image:"https://images.unsplash.com/photo-1599447292180-45fd84092ef4"},
        {name:"Treadmills",image:"https://images.unsplash.com/photo-1576678927484-cc907957088c"},
        {name:"Resistance Bands",image:"https://images.unsplash.com/photo-1598289431512-b97b0917affc"}
      ]
    },
    {
      title:"Sports",
      items:[
        {name:"Cricket",image:"https://images.unsplash.com/photo-1531415074968-036ba1b575da"},
        {name:"Football",image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55"},
        {name:"Basketball",image:"https://images.unsplash.com/photo-1546519638-68e109498ffc"},
        {name:"Badminton",image:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea"}
      ]
    },
    {
      title:"Outdoor Activities",
      items:[
        {name:"Cycles",image:"https://images.unsplash.com/photo-1485965120184-e220f721d03e"},
        {name:"Camping Gear",image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d"},
        {name:"Skating",image:"https://images.unsplash.com/photo-1531577722019-0e3a9d2f5e0f"},
        {name:"Swimming",image:"https://images.unsplash.com/photo-1560089000-7433a4ebbd64"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="sports-fitness"/>
      </div>
    </>
  );
}
export default SportsFitness;