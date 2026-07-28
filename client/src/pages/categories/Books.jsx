import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Books(){
  const banners=[
    {
      title:"Explore Knowledge",
      subtitle:"Discover books that inspire and educate",
      image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66"
    },
    {
      title:"Best Sellers",
      subtitle:"Top trending books loved by readers",
      image:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
    },
    {
      title:"New Arrivals",
      subtitle:"Fresh collections for every reader",
      image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    }
  ];
  const sections=[
    {
      title:"Academic Books",
      items:[
        {name:"Engineering",image:"https://images.unsplash.com/photo-1589998059171-988d887df646"},
        {name:"Science",image:"https://images.unsplash.com/photo-1532094349884-543bc11b234d"},
        {name:"Mathematics",image:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb"},
        {name:"Computer Science",image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4"}
      ]
    },
    {
      title:"Fiction & Literature",
      items:[
        {name:"Novels",image:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e"},
        {name:"Comics",image:"https://images.unsplash.com/photo-1608889476561-6242cfdbf622"},
        {name:"Fantasy",image:"https://images.unsplash.com/photo-1512820790803-83ca734da794"},
        {name:"Mystery",image:"https://images.unsplash.com/photo-1587876931567-564ce588bfbd"}
      ]
    },
    {
      title:"Self Development",
      items:[
        {name:"Motivation",image:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d"},
        {name:"Business",image:"https://images.unsplash.com/photo-1556761175-b413da4baf72"},
        {name:"Biography",image:"https://images.unsplash.com/photo-1544717305-2782549b5136"},
        {name:"Health",image:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe"}
      ]
    }
  ];
  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-6">
        <CategoryBanner banners={banners}/>
        <CategorySection sections={sections} category="books"/>
      </div>
    </>
  );
}
export default Books;