import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { LoginRequired } from "../../components/LoginRequiredBanner/LoginRequired";
import { getUser, updateProfileAvatar, updateUserProfile } from "../../services/UserServices";

const UserProfile = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [profile, setProfile] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profilePicUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newProfilePicFile, setNewProfilePicFile] = useState(null);
  const [previewPic, setPreviewPic] = useState("");

  const fetchUserProfile = async () => {
    try {
      const userData = await getUser();
      setProfile(userData);
      setPreviewPic(userData.profilePicUrl);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to load user profile." });
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile();
    }
  }, [accessToken]);

  if (!accessToken) {
    return <LoginRequired loc={"Profile"} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  //for showing response message banner only for 3 seconds
  useEffect(() => {
  if (message.text) {
    const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    return () => clearTimeout(timer);
  }
}, [message]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ type: "", text: "" }); // Clear previous messages

  try {
    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
    };

    await updateUserProfile(updatedProfile);
    if(newProfilePicFile){
      const formData = new FormData();
      formData.append("avatar", newProfilePicFile)
      const resp = await updateProfileAvatar(formData);

      localStorage.setItem("avatar",resp.data)
    }

    setMessage({ type: "success", text: "Profile updated successfully!" });

    await fetchUserProfile();
    setNewProfilePicFile(null);
  } catch (err) {
    const errMsg =
      err?.response?.data?.message || err.message || "Failed to update profile. Please try again.";
    setMessage({ type: "error", text: errMsg });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="user-profile">
      <h2>Your Profile</h2>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-pic-section">
          <img
            src={previewPic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-pic"
          />
          <label htmlFor="profilePicUpload" className="upload-btn">
            Upload New Picture
          </label>
          <input
            type="file"
            id="profilePicUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p className="note">* Profile picture cannot be edited directly here.</p>
        </div>

        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email (not editable):
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <button type="submit" disabled={loading} className="update-btn">
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
