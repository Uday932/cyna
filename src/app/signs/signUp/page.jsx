"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import AppContext from "@/app/context/AppContext.js";
import routes from "@/utils/routes.js";
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation.js";
import { useContext, useState } from "react";
import * as Yup from "yup";

const SignUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpSchema = Yup.object().shape({
  firstName: firstNameValidator.required("Le prénom est requis."),
  lastName: lastNameValidator.required("Le nom est requis."),
  email: emailValidator.required("L'e-mail est requis"),
  password: passwordValidator
    .required("Le mot de passe est requis")
    .label("Mot de passe"),
});

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { setSession } = useContext(AppContext);
  const router = useRouter();

  const handleSubmitSignUp = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      const { data } = await axios.post(apiRoutes.signs.signUp(), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      setMessage(data.message);
      setSession(data.jwt);

      router.push(routes.home());
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      } else if (error.request) {
        setMessage(
          "Le serveur est actuellement hors ligne. Veuillez réessayer plus tard.",
        );
      } else {
        setMessage("Une erreur interne s'est produite.");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Text size="title" className="flex justify-center">
        CRÉATION DE COMPTE
      </Text>

      <Text
        className={clsx(
          "my-2 min-h-[40px] rounded p-1",
          isError ? "bg-red-500" : "",
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
          <Form className="flex w-1/3 flex-col gap-2">
            <FormField
              name="firstName"
              placeholder="Prénom"
              className="w-full"
              required
            />

            <FormField
              name="lastName"
              type="text"
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
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="w-full"
              required
            />

            <Button type="submit">
              {isSubmitting ? "En cours..." : "Créer un compte"}
            </Button>
          </Form>
        )}
      </Formik>

      <Link href={routes.signs.signIn()} className="text-blue-500">
        Vous avez déjà un compte ? Connectez-vous.
      </Link>
    </div>
  );
};

export default SignUp;
