import {Link} from "react-router";
import "./LoginRequired.css"
const LoginRequired = ({loc})=>{
    return (
        <div className="login-required-banner">
        <h2>Please Log In to View Your {loc}</h2>
        <p>We're excited to show you your {loc} — just log in first!</p>
        <Link to="/login" className="login-btn">Login Now</Link>
      </div>
    )
}

export{
    LoginRequired
}