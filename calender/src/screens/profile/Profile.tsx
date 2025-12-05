import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Fetch profile and profile picture
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch user data
    fetch("http://localhost:5184/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setEmail(data.email || "");
        setPassword(""); // password not returned for security
      })
      .catch((err) => console.error("Failed to fetch profile:", err));

    // Fetch profile picture securely
    fetch("http://localhost:5184/api/profile/me/picture", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile picture");
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImgUrl(url);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImgUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Submit updated profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    if (password) formData.append("Password", password);
    if (file) formData.append("ProfilePicture", file);

    try {
      const res = await fetch("http://localhost:5184/api/profile/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Failed to update profile:", errText);
        return;
      }

      const updatedUser = await res.json();
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setPassword("");
      setEditing(false);

      // Refresh profile picture
      if (updatedUser.profilePictureUrl) {
        const pictureRes = await fetch(
          "http://localhost:5184" + updatedUser.profilePictureUrl,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const blob = await pictureRes.blob();
        setImgUrl(URL.createObjectURL(blob));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (editing) {
    return (
      <div className="profile-card">
        <div className="profile-header">
          <label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <img className="profile-pic" src={imgUrl || ""} alt="Profile" />
          </label>
          <div className="profile-info">
            Name:{" "}
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <p className="profile-role">Student Developer</p>
          </div>
        </div>
        <div className="profile-info">
          Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit} className="btn-green">
          Submit
        </button>
        <button type="button" onClick={() => setEditing(false)} className="btn-red">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={imgUrl || ""} alt="Profile" className="profile-pic" />
        <div>
          <h3 className="profile-name">{name}</h3>
          <p className="profile-role">Student Developer</p>
        </div>
      </div>
      <div className="profile-info">
        <p>{email}</p>
      </div>
      <button type="button" onClick={() => setEditing(true)} className="btn-green">
        Edit
      </button>
    </div>
  );
};

export default Profile;
