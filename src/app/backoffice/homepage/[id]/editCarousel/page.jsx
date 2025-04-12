"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { stringValidator } from "@/utils/validators";
import Button from "@/components/ui/Button";

const editCarouselSchema = yup.object().shape({
  title: stringValidator("title"),
  description: stringValidator("description"),
  image: stringValidator("image"),
  link: stringValidator("link"),
  priority: stringValidator("priority"),
});

const EditCarousel = () => {
  const { id } = useParams();
  const [carousel, setCarousel] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const { data } = await axios.get(apiRoutes.carousel.single(id));

        setCarousel(data);
      } catch (err) {
        setError("Erreur lors du chargement du service.");
      }
    };

    fetchCarousel();
  }, [id]);

  if (!carousel) {
    return <Text color="black">Chargement...</Text>;
  }

  const handleEditCarousel = async (values) => {
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post(apiRoutes.backoffice.carousel(carousel.id), {
        title: values.title,
        description: values.description,
        image: values.image,
        link: values.link,
        priority: values.priority,
      });

      setMessage(data.message);
    } catch (error) {
      if (error.response) {
        setError("Une erreur est survenue. Veuillez réessayer.");
      } else if (error.request) {
        setError(
          "Le serveur est actuellement hors ligne. Veuillez réessayer plus tard.",
        );
      } else {
        setError("Une erreur interne s'est produite.");
      }
    }
  };

  return (
    <div className="w-full rounded-xl bg-secondary p-4">
      <div>
        <Text size="subtitle" className="text-center">
          Modifier le carousel
        </Text>
      </div>

      <Formik
        initialValues={{
          title: carousel.title,
          description: carousel.description,
          image: carousel.image,
          link: carousel.link,
          priority: carousel.priority,
        }}
        validationSchema={editCarouselSchema}
        onSubmit={handleEditCarousel}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <FormField name="title" label="Titre" />

            <FormField name="description" label="Description" />

            <FormField name="image" label="Image" />

            <FormField name="link" label="Lien" />

            <FormField name="priority" label="Priorité" type="number" />

            <Button type="submit">
              {isSubmitting ? "En cours..." : "Valider"}
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

export default EditCarousel;
