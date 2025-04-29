import "./App.css";
import Header from "./components/header_components/Header.jsx";

const App = ()=>{
    return(
        <div className="myPage">
        <header>
       <Header />
        </header>
        <div className="content">
        <aside>Aside</aside>
        <main>Main</main>
        </div>
        

        <footer>Footer</footer>
        </div>
    )
}

export default App;