"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const SignUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Le prénom est trop court.")
    .max(30, "Le prénom est trop long.")
    .required("Le prénom est requis."),
  lastName: Yup.string()
    .min(1, "Le nom est trop court.")
    .max(30, "Le nom est trop long.")
    .required("Le nom est requis."),
  email: Yup.string()
    .email("Adresse e-mail invalide")
    .required("L'e-mail est requis"),
  password: Yup.string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "Le mot de passe doit comporter au moins 8 caractères et contenir au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial."
    )
    .required("Le mot de passe est requis")
    .label("Mot de passe"),
});

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmitSignUp = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      const {
        data: { message },
      } = await axios.post(apiRoutes.signs.signUp(), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      setMessage(message);
      resetForm();
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      } else if (error.request) {
        setMessage(
          "Le serveur est actuellement hors ligne. Veuillez réessayer plus tard."
        );
      } else {
        setMessage("Une erreur interne s'est produite.");
      }
    }
  };

  return (
    <div className="bg-secondary p-10 flex gap-y-2 flex-col justify-center items-center min-h-screen">
      <Text size="title1" className="flex justify-center">
        CRÉATION DE COMPTE
      </Text>

      <Text
        className={clsx(
          "my-2 min-h-[40px] p-1 rounded",
          isError ? "bg-red-500" : ""
        )}
      >
        {message}
      </Text>

      <Formik
        initialValues={SignUpInitialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignUp(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2 w-1/3">
            <FormField name="firstName" placeholder="Prénom" required />

            <FormField name="lastName" type="text" placeholder="Nom" required />

            <FormField
              name="email"
              type="email"
              placeholder="E-mail"
              required
            />

            <FormField
              className="text-ellipsis"
              name="password"
              type="password"
              placeholder="Mot de passe"
              required
            />

            <Button type="submit">
              {isSubmitting ? "En cours..." : "Créer un compte"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
