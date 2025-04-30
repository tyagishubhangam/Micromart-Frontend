import "./Footer.css";

import linkedIn from "../../assets/socialIcons/linkedIn.png"
import facebook from "../../assets/socialIcons/facebook.png"
import youtube from "../../assets/socialIcons/youtube.png"
import twitter from "../../assets/socialIcons/twitter.png"
import instagram from "../../assets/socialIcons/instagram.png";

const Footer = ()=>{
    return (
        <footer>
            <div className="head-1">
            Subscribe to our newsletter
            </div>
            <div className="text-box">
            <span id = "email-icon" className="material-symbols-outlined">mail</span>
                <input type="text" placeholder="Input your email" />
                <button className="btn-typ3">
                    Subscribe   
                </button>
            </div>

            <div className="footer-nav">
                <ul className="nav-foot">
                    {/* <li><a href="#"> Pricing</a></li> */}
                    <li><a href="#"> About us</a></li>
                    {/* <li><a href="#"> Features</a></li> */}
                    <li><a href="#"> Help Center</a></li>
                    <li><a href="#"> Contact us</a></li>
                    <li><a href="#"> Carrers</a></li>
                    <li><a href="#"> FAQs</a></li>
                </ul>
            </div>
            <hr />
            <div className="foot-end">
                <div className="tagline">
                    &copy; {new Date().getFullYear()} Micromart, Inc.
                </div>
            <div className="social-media-icons">
            <div><a href="#"><img src={youtube} alt="" /></a></div>
            <div><a href="#"><img src={facebook} alt="" /></a></div>
            <div><a href="#"><img src={twitter} alt="" /></a></div>
            <div><a href="#"><img src={linkedIn} alt="" /></a></div>
            <div><a href="#"><img src={instagram} alt="" /></a></div>
            </div>
            </div>
        </footer>
    )
}

export default Footer;