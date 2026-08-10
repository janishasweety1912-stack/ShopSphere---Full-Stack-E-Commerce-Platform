import Navbar from "../../components/Navbar";
import CategoryBanner from "../../components/CategoryBanner";
import CategorySection from "../../components/CategorySection";

function Fashion() {
  const banners = [
    {
      title: "Summer Collection",
      subtitle: "Fresh styles for sunny days",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      link: "/products/fashion",
    },
    {
      title: "Festival Collection",
      subtitle: "Celebrate with premium fashion",
      image:
        "https://i.pinimg.com/736x/1a/c6/6d/1ac66d93911aa17da744f2b92990a6af.jpg",
      link: "/products/fashion?filter=discount",
    },
    {
      title: "New Arrivals",
      subtitle: "Latest trends just arrived",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050",
      link: "/products/fashion?filter=new-arrivals",
    },
  ];

  const sections = [
    {
      title: "Men's Collection",
      items: [
        {
          name: "T-Shirts",
          image:
            "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_1280.jpg",
        },
        {
          name: "Shirts",
          image:
            "https://tse3.mm.bing.net/th/id/OIP.xR3TDbcrcis_OBehnvvdgAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          name: "Jeans",
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d",
        },
        {
          name: "Formal Wear",
          image:
            "https://i5.walmartimages.com/asr/8718392e-f3d5-4237-9750-09384694dd32.f2f691d7926973b9253dd1befc9c612f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
        },
        {
          name: "Ethnic",
          image:
            "https://5.imimg.com/data5/SELLER/Default/2024/9/449430513/NO/CM/LA/160404239/whatsapp-image-2024-09-09-at-12-48-47-pm-1-500x500.jpeg",
        },
        {
          name: "Hoodies",
          image:
            "https://tse3.mm.bing.net/th/id/OIP.8F8P7gZ9XG3iXrWPcFqUAgHaHa?r=0&w=551&h=551&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          name: "Jackets",
          image:
            "https://tse1.mm.bing.net/th/id/OIP.EdPCIELGc4AxmwXHF6TW2wHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
      ],
    },

    {
      title: "Women's Collection",
      items: [
        {
          name: "Sarees",
          image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        },
        {
          name: "Kurtis",
          image:
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
        },
        {
          name: "Dresses",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
        },
        {
          name: "Tops",
          image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
        },
        {
          name: "Jeans",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        },
        {
          name: "Western",
          image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        },
        {
          name: "Ethnic",
          image:
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
        },
        {
          name: "Footwear",
          image:
            "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f",
        },
      ],
    },

    {
      title: "Kids Boys Collection",
      items: [
        {
          name: "T-Shirts",
          image:
            "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
        },
        {
          name: "Shirts",
          image:
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
        },
        {
          name: "Shorts",
          image:
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
        },
        {
          name: "Jeans",
          image:
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        },
      ],
    },

    {
      title: "Kids Girls Collection",
      items: [
        {
          name: "Dresses",
          image:
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
        },
        {
          name: "Tops",
          image:
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8",
        },
        {
          name: "Skirts",
          image:
            "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5",
        },
        {
          name: "Ethnic Wear",
          image:
            "https://images.unsplash.com/photo-1605763240000-7e93b172d754",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#020617] min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <CategoryBanner
            banners={banners}
            category="fashion"
          />

          <div className="mt-16">
            <CategorySection
              sections={sections}
              category="fashion"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Fashion;