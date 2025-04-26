"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { passwordValidator } from "@/utils/validators.js";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const ResetInitialValues = {
  password: "",
  confirmPassword: "",
};

const getResetSchema = (t) => {
  return Yup.object().shape({
    password: passwordValidator
      .required(t("form.required", { field: t("common.password") }))
      .label(t("common.password")),
    confirmPassword: passwordValidator
      .required(t("form.required", { field: t("common.password") }))
      .oneOf([Yup.ref("password"), null], t("form.confirmation"))
      .label(t("common.password")),
  });
};

const ResetPassword = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const t = useTranslations();

  const handleSubmitSignIn = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      await axios.post(apiRoutes.signs.forgotPassword.reset(), {
        password: values.password,
        resetToken: params.resetToken,
      });

      setMessage(t("signs.forgot.reset.messageSuccess"));
      resetForm();
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
    <div className="flex w-full flex-col items-center justify-center">
      <Text size="title" className="flex justify-center">
        {t("signs.forgot.reset.title")}
      </Text>

      <Text
        className={clsx("min-h-[40px] rounded p-1", isError && "bg-red-500")}
      >
        {message}
      </Text>

      <Formik
        initialValues={ResetInitialValues}
        validationSchema={getResetSchema(t)}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignIn(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-1/4 flex-col gap-2">
            <FormField
              name="password"
              type="password"
              placeholder={t("common.password")}
              required
            />

            <FormField
              name="confirmPassword"
              type="password"
              placeholder={t("signs.forgot.reset.confirmPassword")}
              required
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              loadingText={t("signs.forgot.reset.submit.loading")}
              defaultText={t("signs.forgot.reset.submit.label")}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
