"use client";
import AppContext from "@/app/context/AppContext.js";
import routes from "@/utils/routes.js";
import { emailValidator, passwordValidator } from "@/utils/validators.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation.js";
import { useContext, useState } from "react";
import * as Yup from "yup";

const SignInInitialValues = {
  email: "",
  password: "",
};

const SignInSchema = Yup.object().shape({
  email: emailValidator.required("L'e-mail est requis"),
  password: passwordValidator
    .required("Le mot de passe est requis")
    .label("Mot de passe"),
});

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { signIn } = useContext(AppContext);

  const handleSubmitSignUp = async (values) => {
    try {
      setMessage("");
      setIsError(false);

      await signIn(values.email, values.password);

      router.push(routes.home());
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage(error.response.data.error || "Une erreur est survenue.");
      } else if (error.request) {
        setMessage("Problème de connexion au serveur. Veuillez réessayer.");
      } else {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Text size="title" className="flex justify-center">
        CONNEXION
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
        initialValues={SignInInitialValues}
        validationSchema={SignInSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignUp(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2 md:w-1/3 lg:w-1/5">
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
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </Form>
        )}
      </Formik>

      <Link
        href={routes.signs.forgotPassword.request()}
        className="text-blue-500"
        title="Aller à la page de réinitialisation du mot de passe"
      >
        Mot de passe oublié ?
      </Link>

      <Link href={routes.signs.signUp()} className="text-blue-500">
        Pas encore de compte ? Inscrivez-vous
      </Link>
    </div>
  );
};

export default SignIn;
