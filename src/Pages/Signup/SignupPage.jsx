import { useState } from "react";
import "./SignupPage.css";
import { attemptSignup } from "../../services/UserServices";



const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profilePic, setProfilePic] = useState("/avatardefault.png");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const form = new FormData();
form.append("signupRequest", new Blob(
  [JSON.stringify({
    ...formData,
    confirmPassword: undefined // exclude confirmPassword
  })],
  { type: "application/json" }
));
    if (profilePic) {
      form.append("avatar", profilePic);
    }

    try {
      const response = await attemptSignup(form);
        console.log(response);
      if (!response.statusText == "OK") {
        throw new Error("Signup failed");
      }

    //ToDo: Handle Errors and show messages accordingly
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Sign Up</h2>
        <p>Create your account for a personalized shopping experience</p>
        <div className="input-box">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="input-box">
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>
        <div className="input-box">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-box">
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-box">
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="input-box">
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="input-box">
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        </div>


        <div className="input-box">
          <label>Avatar:</label>
          <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} required />
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
