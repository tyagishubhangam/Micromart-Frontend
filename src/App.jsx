import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router";
import Home from "./Pages/Homepage/Home";
import Footer from "./components/Footer/Footer";



const App = ()=>{
    return(
        
        <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/categories" element={<Categories />} />
          <Route path="/featured" element={<Featured />} /> */}
        </Routes>
        <Footer />
      </>
    )
}

export default App;