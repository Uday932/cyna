"use client";
import apiRoutes from "@/apiUtils/apiRoutes";
import { stringValidator } from "@/utils/validators";
import Button from "@@/ui/Button";
import FormField from "@@/ui/FormField";
import Text from "@@/ui/Text";
import axios from "axios";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

// Validation schema
const editCategorySchema = yup.object().shape({
  name: stringValidator(undefined, "name"),
  description: stringValidator(undefined, "description"),
  image: stringValidator(undefined, "image"),
  link: stringValidator(undefined, "link"),
});

const EditCategory = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie depuis l'URL
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(apiRoutes.categories.single(id));
        setCategory(response.data?.category || response.data); // S'adapte au format reçu 
      } catch (err) {
        console.error("Erreur lors du chargement de la catégorie :", err);
        setError("Erreur lors du chargement des données.");
      }
    };

    if (id) fetchCategory();
  }, [id]);

  const handleEditCategory = async (values) => {
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.put(
        apiRoutes.backoffice.categories.edit(id),
        {
          name: values.name,
          description: values.description,
          image: values.image,
          link: values.link,
        },
      );

      setMessage(data.message || "Catégorie mise à jour avec succès.");
    } catch (error) {
      if (error.response) {
        setError(
          `Erreur ${error.response.status}: ${error.response.statusText}`,
        );
      } else if (error.request) {
        setError("Le serveur ne répond pas. Veuillez réessayer plus tard.");
      } else {
        setError("Une erreur interne est survenue.");
      }
    }
  };

  if (!category) {
    return <Text>Chargement...</Text>;
  }

  return (
    <div className="w-full rounded-xl bg-secondary p-4">
      <Text size="subtitle" className="text-center">
        Modifier la catégorie
      </Text>

      <Formik
        enableReinitialize
        initialValues={{
          name: category.name || "",
          description: category.description || "",
          image: category.image || "",
          link: category.link || "",
        }}
        validationSchema={editCategorySchema}
        onSubmit={handleEditCategory}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <FormField name="name" label="Nom" />
            <FormField name="description" label="Description" />
            <FormField name="image" label="URL de l'image" />
            <FormField name="link" label="Lien" />

            <Button type="submit">
              {isSubmitting ? "Modification en cours..." : "Valider"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center">
        {error && (
          <Text color="error" className="mt-5 text-center">
            {error}
          </Text>
        )}
        {message && (
          <Text color="success" className="mt-5 text-center">
            {message}
          </Text>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
