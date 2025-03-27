"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import apiRoutes from "@/apiUtils/apiRoutes";

export default function Homepage() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(apiRoutes.backoffice.textSection())
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          setText(data.content);
        } else {
          setText(""); // Valeur par défaut pour éviter le crash
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  const handleUpdate = async () => {
    await fetch(apiRoutes.backoffice.textSection(), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
  };

  return (
    <div>
      <h2>Modifier la section de texte</h2>
      <Input value={text} onChange={(e) => setText(e.target.value)}></Input>

      <Button onClick={handleUpdate}>Enregistrer</Button>
    </div>
  );
}
