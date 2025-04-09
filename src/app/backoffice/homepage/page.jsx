"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";
import Input from "@@/ui/Input";
import Button from "@@/ui/Button";

export default function Homepage() {
  const [text, setText] = useState("");
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    axios
      .get(apiRoutes.backoffice.textSection())
      .then((response) => setText(response.data?.content || ""))
      .catch((error) => {
        console.error("Erreur lors du fetch du texte :", error);
      });

    axios
      .get(apiRoutes.backoffice.carousel())
      .then((response) => {
        const withIds = response.data.map((item) => ({
          id: item.id || crypto.randomUUID(),
          ...item,
        }));
        setCarouselItems(withIds);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch du carrousel :", error);
      });
  }, []);

  const handleTextUpdate = async () => {
    try {
      await axios.put(apiRoutes.backoffice.textSection(), {
        content: text,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du texte :", error);
    }
  };

  const handleCarouselUpdate = async () => {
    const validItems = carouselItems.filter(
      (item) =>
        item.title.trim() || item.description.trim() || item.image.trim(),
    );

    try {
      await axios.put(apiRoutes.backoffice.carousel(), {
        items: validItems,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du carrousel :", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...carouselItems];
    updatedItems[index][field] = value;
    setCarouselItems(updatedItems);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(index, "image", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = () => {
    setCarouselItems([
      ...carouselItems,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        image: "",
        link: "",
      },
    ]);
  };

  const handleDeleteSlide = async (id) => {
    const isInDatabase = !isNaN(Number(id));

    if (isInDatabase) {
      try {
        const deleteUrl = `${apiRoutes.backoffice.carousel()}/${id}`;
        await axios.delete(deleteUrl);
      } catch (error) {
        console.error("Erreur lors de la suppression de la slide :", error);
        return;
      }
    }

    setCarouselItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* Section de texte dynamique */}
      <Text size="subtitle" color="black">
        Modifier la section de texte
      </Text>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleTextUpdate}>Enregistrer</Button>

      {/* Section du carrousel */}
      <Text size="subtitle" color="black" className="mt-6">
        Modifier le carrousel
      </Text>
      {carouselItems.map((item, index) => (
        <div key={item.id} className="my-4 border p-4">
          <Input
            label="Titre"
            value={item.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
          />
          <Input
            label="Description"
            value={item.description}
            onChange={(e) =>
              handleInputChange(index, "description", e.target.value)
            }
          />
          <Input
            label="Image"
            type="file"
            onChange={(e) => handleImageChange(index, e)}
          />
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="mt-2 h-32 w-32 object-cover"
            />
          )}
          <Input
            label="Lien"
            value={item.link}
            onChange={(e) => handleInputChange(index, "link", e.target.value)}
          />
          <Button
            onClick={() => handleDeleteSlide(item.id)}
            variant="destructive"
          >
            Supprimer
          </Button>
        </div>
      ))}
      <Button onClick={handleAddSlide} variant="secondary">
        Ajouter une slide
      </Button>
      <Button onClick={handleCarouselUpdate}>Enregistrer le carrousel</Button>
    </div>
  );
}
