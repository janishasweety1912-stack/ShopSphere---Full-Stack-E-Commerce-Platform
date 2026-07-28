import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Toys(){
  const banners=[
    {
      title:"Kids Fun Zone",
      subtitle:"Explore exciting toys for endless fun",
      image:"https://images.unsplash.com/photo-1594782919355-2a4c9d3e8f1f"
    },
    {
      title:"Learning & Creativity",
      subtitle:"Toys that make learning enjoyable",
      image:"https://images.unsplash.com/photo-1566576912320-7efb9c3de0e4"
    },
    {
      title:"New Toy Collection",
      subtitle:"Discover the latest toys for kids",
      image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11"
    }
  ];
  const sections=[
    {
      title:"Boys Toys",
      items:[
        {name:"Action Figures",image:"https://images.unsplash.com/photo-1560961911-ba7ef651a56c"},
        {name:"Cars",image:"https://images.unsplash.com/photo-1594736797933-d0401ba2fe65"},
        {name:"Building Blocks",image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b"},
        {name:"Remote Control Toys",image:"https://images.unsplash.com/photo-1608889825205-eebdb9fc5806"}
      ]
    },
    {
      title:"Girls Toys",
      items:[
        {name:"Dolls",image:"https://images.unsplash.com/photo-1594784053730-1e8a4d5b1c8f"},
        {name:"Kitchen Sets",image:"https://images.unsplash.com/photo-1596464716127-f2a82984de30"},
        {name:"Soft Toys",image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11"},
        {name:"Craft Kits",image:"https://images.unsplash.com/photo-1452860606245-08befc0ff44b"}
      ]
    },
    {
      title:"Educational Toys",
      items:[
        {name:"Puzzle Games",image:"https://images.unsplash.com/photo-1606503153255-59d8b8b4d5d2"},
        {name:"Science Kits",image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"},
        {name:"Learning Games",image:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"},
        {name:"Board Games",image:"https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="toys"/>
      </div>
    </>
  );
}
export default Toys;