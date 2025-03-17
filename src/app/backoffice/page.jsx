"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/app/context/AppContext.js";

const BackOffice = () => {
  const { state } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Role actuel :", state.session?.role);
    if (!state.session || state.session.role !== "ADMIN") {
      router.push("/"); // Redirige vers la home si l'utilisateur n'est pas admin
    }
  }, [state.session, router]);

  if (!state.session || state.session.role !== "ADMIN") {
    return null; // Évite d'afficher la page avant la redirection
  }

  return (
    <div>
      <h1>Bienvenue dans le BackOffice</h1>
    </div>
  );
};

export default BackOffice;
