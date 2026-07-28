import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";
import FlashSale from "../components/FlashSale";
import NewArrivals from "../components/NewArrivals";
import ShopByOccasion from "../components/ShopByOccasion";
import ProductList from "../components/ProductList";
import BrandShowcase from "../components/BrandShowcase";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home(){
    return(
        <>
            <Navbar />
            <Hero />
            <Categories />
            <TrendingProducts />
            <FlashSale />
            <NewArrivals />
            <ShopByOccasion />
            <ProductList />
            <BrandShowcase />
            <Features />
            <Footer />
        </>
    );
}

export default Home;