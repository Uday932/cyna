"use client";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import { useState } from "react";
import apiRoutes from "@/apiUtils/apiRoutes";

const ContactInitialValues = {
  name: "",
  email: "",
  message: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le nom est requis.")
    .min(2, "Le nom doit contenir au moins 2 caractères."),
  email: Yup.string()
    .email("L'e-mail n'est pas valide.")
    .required("L'e-mail est requis."),
  message: Yup.string()
    .required("Le message est requis.")
    .min(10, "Le message doit contenir au moins 10 caractères."),
});

const ContactPage = () => {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);

  const handleSubmitContact = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      await axios.post(apiRoutes.contact(), values);

      setMessage("Votre message a été envoyé avec succès !");
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setIsError(true);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 p-6">
      <Text size="title" className="text-center">
        NOUS CONTACTER
      </Text>

      {message && (
        <Text
          className={`my-2 min-h-[40px] rounded p-1 ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message}
        </Text>
      )}

      <Formik
        initialValues={ContactInitialValues}
        validationSchema={ContactSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitContact(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full max-w-md flex-col gap-4">
            <FormField
              name="name"
              placeholder="Nom"
              className="w-full"
              required
            />

            <FormField
              name="email"
              type="email"
              placeholder="E-mail"
              className="w-full"
              required
            />

            <FormField
              name="message"
              as="textarea"
              placeholder="Message"
              className="h-32 w-full resize-none"
              required
            />

            <Button type="submit">
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactPage;
