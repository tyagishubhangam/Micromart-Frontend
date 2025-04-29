import Navbar from './Navbar.jsx';
import "./Header.css";


const Header = ()=>{
    return(
        <div className="header-div">
            <div className="logo_container">
                <img src="src/assets/logo.jpeg" alt="logo" />
            </div>
            <Navbar  className="header-navbar"/>
            <div className="side-buttons">
                <button>Login</button>
                <button>Signup</button>
                <button><span className="material-symbols-outlined">
shopping_bag
</span></button>
            </div>
        </div>
    )
}

export default Header;