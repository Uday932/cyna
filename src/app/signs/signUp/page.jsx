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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation.js";
import { useContext, useState } from "react";
import * as Yup from "yup";

const SignUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const getSignUpSchema = (t) => {
  return Yup.object().shape({
    firstName: firstNameValidator.required(
      t("form.required", { field: t("common.firstName") }),
    ),
    lastName: lastNameValidator.required(
      t("form.required", { field: t("common.lastName") }),
    ),
    email: emailValidator.required(
      t("form.required", { field: t("common.email") }),
    ),
    password: passwordValidator
      .required(t("form.required", { field: t("common.password") }))
      .label(t("common.password")),
  });
};

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { setSession } = useContext(AppContext);
  const router = useRouter();
  const t = useTranslations();

  const handleSubmitSignUp = async (values) => {
    try {
      setMessage("");
      setIsError(false);

      const { data } = await axios.post(apiRoutes.signs.signUp(), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      setMessage(t("signs.signUp.messageSuccess"));
      setSession(data.jwt);

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
        {t("signs.signUp.title")}
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
        validationSchema={getSignUpSchema(t)}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignUp(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-1/3 flex-col gap-2">
            <FormField
              name="firstName"
              placeholder={t("common.firstName")}
              className="w-full"
              required
            />

            <FormField
              name="lastName"
              type="text"
              placeholder={t("common.lastName")}
              className="w-full"
              required
            />

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

            <Button type="submit">
              {isSubmitting
                ? t("common.sending")
                : t("signs.signUp.createAccount")}
            </Button>
          </Form>
        )}
      </Formik>

      <Link href={routes.signs.signIn()}>
        {t("signs.signUp.alreadyHaveAnAccount")}
      </Link>
    </div>
  );
};

export default SignUp;
