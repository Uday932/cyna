"use client";

import { useState, useEffect } from "react";

export default function Homepage() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/backoffice/text-section")
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse de l'API :", data);
        if (data && data.content) {
          setText(data.content);
        } else {
          setText(""); // Valeur par défaut pour éviter le crash
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  const handleUpdate = async () => {
    await fetch("/api/backoffice/text-section", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    alert("Texte mis à jour !");
  };

  return (
    <div>
      <h2>Modifier la section de texte</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleUpdate}>Enregistrer</button>
    </div>
  );
}
