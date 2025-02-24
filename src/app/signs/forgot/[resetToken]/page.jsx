"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const ResetInitialValues = {
  password: "",
  confirmPassword: "",
};

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "Le mot de passe doit comporter au moins 8 caractères et contenir au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial.",
    )
    .required("Le mot de passe est requis")
    .label("Mot de passe"),
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "Le mot de passe doit comporter au moins 8 caractères et contenir au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial.",
    )
    .required("Le mot de passe est requis")
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre",
    )
    .label("Mot de passe"),
});

const ResetPassword = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmitSignIn = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      const {
        data: { message },
      } = await axios.post(apiRoutes.signs.forgotPassword.reset(), {
        password: values.password,
        resetToken: params.resetToken,
      });

      setMessage(message);
      resetForm();
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-10">
      <Text size="title1" className="flex justify-center">
        RÉINITIALISATION DE MOT DE PASSE
      </Text>

      <Text
        className={clsx(
          "min-h-[40px] rounded p-1",
          isError ? "bg-red-500" : "",
        )}
      >
        {message}
      </Text>

      <Formik
        initialValues={ResetInitialValues}
        validationSchema={ResetSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignIn(values, { resetForm })
        }
      >
        {() => (
          <Form className="flex w-1/4 flex-col gap-2">
            <FormField
              className="text-ellipsis"
              name="password"
              type="password"
              placeholder="Mot de passe"
              required
            />

            <FormField
              className="text-ellipsis"
              name="confirmPassword"
              type="password"
              placeholder="Confirmer mot de passe"
              required
            />

            <Button type="submit">Réinitialiser le mot de passe</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
