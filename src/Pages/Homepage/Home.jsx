import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = ()=>{
    return(
        <div className="homepage">
            <div className="heading">Featured Products</div>
            <div className="products-catalogue">
                <ProductCard name="Leather Jacket" rating="5" price="2002"/>
            </div>
        </div>
    );
}

export default Home;