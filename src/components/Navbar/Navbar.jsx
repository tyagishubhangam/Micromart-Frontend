import "./Navbar.css";
import logo from "/logo.svg";
import { NavLink,Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" />
        <span className="comp-name">Micromart</span>
      </div>
      <div className="nav-menu">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => isActive ? "active" : ""}>Categories</NavLink>
          </li>
          <li>
            <NavLink to="/featured" className={({ isActive }) => isActive ? "active" : ""}>Featured Products</NavLink>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        
        <Link to="/signup"><button className="typ1-btn">
          <span className="material-symbols-outlined">person_add</span>
          Signup
        </button></Link>
        <button className="typ2-btn">
          <span className="material-symbols-outlined">login</span>
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
