"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { stringValidator } from "@/utils/validators";
import Button from "@@/ui/Button";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

const t = undefined;
const editCarouselSchema = yup.object().shape({
  title: stringValidator(t, "title"),
  description: stringValidator(t, "description"),
  image: stringValidator(t, "image"),
  link: stringValidator(t, "link"),
  priority: stringValidator(t, "priority"),
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
        setError("Error loading service.");
      }
    };

    fetchCarousel();
  }, [id]);

  if (!carousel) {
    return <Text>Loading...</Text>;
  }

  const handleEditCarousel = async (values) => {
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post(
        apiRoutes.backoffice.carousel(carousel.id),
        {
          title: values.title,
          description: values.description,
          image: values.image,
          link: values.link,
          priority: values.priority,
        },
      );

      setMessage(data.message);
    } catch (error) {
      if (error.response) {
        setError("An error has occurred. Please try again..");
      } else if (error.request) {
        setError("The server is currently offline. Please try again later..");
      } else {
        setError("An internal error has occurred.");
      }
    }
  };

  return (
    <div className="w-full rounded-xl">
      <div>
        <Text size="subtitle" className="text-center">
          Edit the carousel
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
            <FormField name="title" label="Title" />

            <FormField name="description" label="Description" />

            <FormField name="image" label="Image" />

            <FormField name="link" label="Link" />

            <FormField name="priority" label="Priority" type="number" />

            <Button type="submit">
              {isSubmitting ? "In progress..." : "Validate"}
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
