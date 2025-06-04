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
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }
    formData.username = `${formData.firstName}"USER"${formData.lastName}`;
    const form = new FormData();
    form.append("signupRequest", new Blob(
      [JSON.stringify({ ...formData, confirmPassword: undefined })],
      { type: "application/json" }
    ));
    if (profilePic) {
      form.append("avatar", profilePic);
    }

    try {
      setLoading(true);
      const response = await attemptSignup(form);
      setLoading(false);

      if (response.ok || response.status === 200) {
        setMessage("Signup successful! Please log in.");
        setMessageType("success");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
        });
        setProfilePic(null);
      } else {
        const resData = await response.json();
        setMessage(resData.message || "Signup failed.");
        setMessageType("error");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="overlay" />
      <form className="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Sign Up</h2>
        <p>Create your account for a personalized shopping experience</p>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="input-box"><input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required /></div>
        <div className="input-box"><input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required /></div>
        <div className="input-box"><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /></div>
        <div className="input-box"><input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /></div>
        <div className="input-box"><input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /></div>
        <div className="input-box"><input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required /></div>
        <div className="input-box"><input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required /></div>

        <div className="input-box file-upload">
          <label>Avatar:</label>
          <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} required />
        </div>

        <div className="terms-box">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree with Terms & Conditions</label>
        </div>

        <button className="btn-typ4" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p className="login-text">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export { SignupPage };
