import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="signup-page">
      <form className="signup-form">
        <h2>Sign Up</h2>
        <p>Create your account for a personalized shopping experience</p>
        
        <div className="input-box">
        <span className="material-symbols-outlined">id_card</span>
        <input  type="text" placeholder="Name" required />
        </div>
        <div className="input-box">
        <span className="material-symbols-outlined">mail</span>
        <input className="inputs" type="email" placeholder="Enter your Email" required />
        </div>
        
        <div className="input-box">
        <span className="material-symbols-outlined">password</span>
        <input className="inputs" type="password" placeholder="Password" required />
        </div>
        <div className="input-box">
        <span className="material-symbols-outlined">password</span>
        <input className="inputs" type="password" placeholder="Confirm Password" required />
        </div>
        
        <div className="terms-box">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree with Terms & Conditions</label>
        </div>
        <button className="btn-typ4" type="submit">Create Account</button>
        <p className="login-text">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export { SignupPage };
