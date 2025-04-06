"use client";

import { useState } from "react";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre les modifications du profil utilisateur
    console.log("User data submitted:", userData);
  };

  return (
    <div className="main-container">
      <h1 className="title">Gérer votre profil</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Nouveau mot de passe"
          />
        </div>
        <button type="submit" className="submit">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
