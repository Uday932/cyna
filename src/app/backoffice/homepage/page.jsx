"use client";

import { useState, useEffect } from "react";
import Input from "@@/ui/Input";
import Button from "@@/ui/Button";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";

export default function Homepage() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(apiRoutes.backoffice.textSection())
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          setText(data.content);
        } else {
          setText("");
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
      <Text size="subtitle" color="black">Modifier la section de texte</Text>
      <Input value={text} onChange={(e) => setText(e.target.value)}></Input>

      <Button onClick={handleUpdate}>Enregistrer</Button>
    </div>
  );
}
