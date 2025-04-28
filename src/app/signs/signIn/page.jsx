"use client";
import AppContext from "@/app/context/AppContext.js";
import routes from "@/utils/routes.js";
import { emailValidator, passwordValidator } from "@/utils/validators.js";
import FormField from "@@/ui/FormField.jsx";
import Link from "@@/ui/Link.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation.js";
import { useContext, useState } from "react";
import * as Yup from "yup";

const SignInInitialValues = {
  email: "",
  password: "",
};

const getSignInSchema = (t) => {
  return Yup.object().shape({
    email: emailValidator(t),
    password: passwordValidator(t),
  });
};

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { signIn } = useContext(AppContext);
  const t = useTranslations();

  const handleSubmitSignUp = async (values) => {
    try {
      setMessage("");
      setIsError(false);

      await signIn(values.email, values.password);

      router.push(routes.home());
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage(
          error.response.data.error ||
            error.response.data.message ||
            t("form.apiErrors.genericError"),
        );
      } else if (error.request) {
        setMessage(t("form.apiErrors.offlineError"));
      } else {
        setMessage(t("form.apiErrors.internalError"));
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Text size="title" className="flex justify-center">
        {t("signs.signIn.title")}
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
        validationSchema={getSignInSchema(t)}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignUp(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2 md:w-1/3 lg:w-1/5">
            <FormField
              name="email"
              type="email"
              placeholder={t("common.email")}
              className="w-full"
              required
            />

            <FormField
              name="password"
              type="password"
              placeholder={t("common.password")}
              className="w-full"
              required
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              loadingText={t("common.connection") + "..."}
              defaultText={t("signs.signIn.connect")}
            />
          </Form>
        )}
      </Formik>

      <Link
        href={routes.signs.forgotPassword.request()}
        title={t("signs.signIn.gotToPwdResetPage")}
      >
        {t("signs.signIn.forgotPassword")}
      </Link>

      <Link href={routes.signs.signUp()}>
        {t("signs.signIn.notRegistered")}
      </Link>
    </div>
  );
};

export default SignIn;
