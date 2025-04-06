import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">eSport Pro Management</Link>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <Link href="/users">Gestion des utilisateurs</Link>
        <Link href="/tournaments">Gestion des tournois</Link>
        <Link href="/teams">Gestion des équipes</Link>
        <Link href="/rankings">Classement et statistiques</Link>
      </div>
      <div className="mobileMenu" onClick={toggleMenu}>
        <div className={`burger ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
