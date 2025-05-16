import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "/logo.svg";
import { NavLink, Link, useNavigate } from "react-router";
import { attemptLogout } from "../../services/UserServices"; // Import the logout function

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // To toggle the dropdown

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      const userId = localStorage.getItem("userId");
      const avatar = localStorage.getItem("avatar");
      setUserData({ userId, avatar });
    }
  }, []);

  const handleLogout = () => {
    attemptLogout(); // Call the logout function from services
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

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

      <>
        {isLoggedIn ? (
          <div className="nav-right-loggedin">
            <div>
              <Link to="/cart" className="link-no-style">
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </Link>
            </div>
            <div>
              <span className="material-symbols-outlined">
                search
              </span>
            </div>
            <div>
              <div className="avatar" onClick={toggleDropdown}>
                <img src={userData.avatar} alt="Avatar" />
              </div>
              {dropdownVisible && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/orders" className="dropdown-item">Orders</Link>
                  <button onClick={handleLogout} className="dropdown-item"><span className="material-symbols-outlined">
logout
</span>Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nav-right">
            <Link to="/signup">
              <button className="typ1-btn">
                <span className="material-symbols-outlined">person_add</span>
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="typ2-btn">
                <span className="material-symbols-outlined">login</span>
                Login
              </button>
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

export default Navbar;
