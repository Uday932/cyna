"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { emailValidator } from "@/utils/validators.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const ForgotInitialValues = {
  email: "",
};

const ForgotSchema = Yup.object().shape({
  email: emailValidator.required("L'e-mail est requis"),
});

const Forgot = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmitSignIn = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      const {
        data: { message },
      } = await axios.post(apiRoutes.signs.forgotPassword.request(), {
        email: values.email,
      });

      setMessage(message);
      resetForm();
    } catch (error) {
      setIsError(true);
      setMessage(
        "Une erreur est survenue. Veuillez réessayer." + error.message,
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Text size="title" className="flex justify-center">
        MOT DE PASSE OUBLIÉ
      </Text>

      <Text
        className={clsx(
          "m-1 min-h-[40px] rounded p-1",
          isError ? "bg-red-500" : "",
        )}
      >
        {message}
      </Text>

      <Text className="mb-2">
        Veuillez saisir votre adresse e-mail pour réinitialiser votre mot de
        passe.
      </Text>

      <Formik
        initialValues={ForgotInitialValues}
        validationSchema={ForgotSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignIn(values, { resetForm })
        }
      >
        {() => (
          <Form className="flex w-1/5 flex-col">
            <FormField
              className="w-full"
              name="email"
              type="email"
              placeholder="E-mail"
              required
            />

            <Button type="submit" className="mt-2">
              Envoyer
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forgot;
