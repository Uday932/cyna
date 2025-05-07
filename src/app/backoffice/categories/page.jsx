"use client";
import { useState, useEffect } from "react";
import apiRoutes from "@/apiUtils/apiRoutes";
import axios from "axios";
import Image from "@@/ui/Image";
import Text from "@@/ui/Text";
import Input from "@@/ui/Input";
import Button from "@@/ui/Button";

const CATEGORIES_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CATEGORIES_URL || "";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiRoutes.categories.all());
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(apiRoutes.backoffice.categories.create(), newCategory);
      fetchCategories();
      setNewCategory({ name: "", description: "", image: "", link: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie :", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(apiRoutes.backoffice.categories.delete(id));
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  const handleEditClick = (category) => {
    setEditCategory({
      id: category.id,
      name: category.name || "",
      description: category.description || "",
      image: category.image || "",
      link: category.link || "",
    });
    setEditMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        apiRoutes.backoffice.categories.edit(editCategory.id),
        editCategory,
      );
      setEditMode(false);
      setEditCategory(null);
      fetchCategories(); // Rafraîchir la liste des catégories
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="p-6">
      {/* Formulaire d'ajout ou édition */}
      <div className="mb-8">
        <Text size="subtitle" color="black" className="mb-2">
          {editMode
            ? "Edit category"
            : "Add a new category"}
        </Text>

        <Input
          label="Name"
          value={editMode ? editCategory?.name : newCategory.name}
          onChange={(e) =>
            editMode
              ? setEditCategory({ ...editCategory, name: e.target.value })
              : setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <Input
          label="Description"
          value={editMode ? editCategory?.description : newCategory.description}
          onChange={(e) =>
            editMode
              ? setEditCategory({
                  ...editCategory,
                  description: e.target.value,
                })
              : setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <Input
          label="Image URL"
          value={editMode ? editCategory?.image : newCategory.image}
          onChange={(e) =>
            editMode
              ? setEditCategory({ ...editCategory, image: e.target.value })
              : setNewCategory({ ...newCategory, image: e.target.value })
          }
        />
        <Input
          label="Link"
          value={editMode ? editCategory?.link : newCategory.link}
          onChange={(e) =>
            editMode
              ? setEditCategory({ ...editCategory, link: e.target.value })
              : setNewCategory({ ...newCategory, link: e.target.value })
          }
        />

        <div className="mt-2 flex gap-2">
          {editMode ? (
            <>
              <Button onClick={handleEditSubmit}>Mettre à jour</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Annuler
              </Button>
            </>
          ) : (
            <Button onClick={handleAddCategory}>Ajouter</Button>
          )}
        </div>
      </div>

      {/* Tableau des catégories */}
      {categories.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {Object.keys(categories[0]).map((key) => {
                if (key === "priority") return null;
                return (
                  <th key={key} className="border p-2 text-center uppercase">
                    <Text size="text">{key}</Text>
                  </th>
                );
              })}
              <th className="border p-2 text-center uppercase">
                <Text size="text">Actions</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                {Object.entries(category).map(([key, value]) => {
                  if (key === "priority") return null;
                  if (key === "image") {
                    return (
                      <td
                        key={key}
                        className="w-[200px] border p-2 text-center"
                      >
                        {value && (
                          <Image
                            src={`${CATEGORIES_URL}${decodeURIComponent(value)}`}
                            alt={`Image ${category.name}`}
                            width={100}
                            height={100}
                            className="object-cover mx-auto"
                          />
                        )}
                      </td>
                    );
                  } else if (key === "createdAt" || key === "updatedAt") {
                    return (
                      <td key={key} className="border p-2 text-center">
                        <Text size="text">
                          {dateFormatter.format(new Date(value))}
                        </Text>
                      </td>
                    );
                  } else {
                    return (
                      <td key={key} className="border p-2 text-center">
                        <Text size="text">{value}</Text>
                      </td>
                    );
                  }
                })}
                <td className="border p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(category)}
                    >
                      <Image
                        width={35}
                        height={35}
                        src="/icons/edit.png"
                        alt="Modifier"
                        className="rounded-xl bg-button p-1 cursor-pointer"
                      />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(category.id)}
                      variant="destructive"
                    >
                      <Image
                        width={35}
                        height={35}
                        src="/icons/delete.png"
                        alt="Supprimer"
                        className="rounded-xl bg-button p-1 cursor-pointer"
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
