"use client";
import AppContext from "@/app/context/AppContext.js";
import Link from "@/components/ui/Link.jsx";
import routes from "@/utils/routes.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
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
  email: Yup.string()
    .email("Adresse e-mail invalide")
    .required("L'e-mail est requis"),
  password: Yup.string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "Le mot de passe doit comporter au moins 8 caractères et contenir au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial.",
    )
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-2 bg-secondary p-10">
      <Text size="title1" className="flex justify-center">
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
          <Form className="flex w-1/3 flex-col gap-2">
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
