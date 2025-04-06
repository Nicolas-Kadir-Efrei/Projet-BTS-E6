"use client";

import Link from "next/link";
export default function Presentation() {
  return (
    <div className="pres">
      <h1>Bienvenue au Tournoi eSport 2025</h1>
      <br />
      <br />
      <p>
        Participez au tournoi d'eSport le plus compétitif de l'année. Rejoignez
        les meilleures équipes du monde entier et montrez vos compétences dans
        des jeux palpitants.
      </p>
      <Link href="./createtournament">
        <button>Inscription</button>
      </Link>
      <div className="logo">
        <img src="assets/img/Logofr.png" />
      </div>
    </div>
  );
}
