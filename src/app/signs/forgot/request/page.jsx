"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { emailValidator } from "@/utils/validators.js";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as Yup from "yup";

const ForgotInitialValues = {
  email: "",
};

const getForgotSchema = (t) => {
  return Yup.object().shape({
    email: emailValidator(t),
  });
};

const Forgot = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const t = useTranslations();

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
        {t("signs.forgot.request.title")}
      </Text>

      <Text
        className={clsx(
          "m-1 min-h-[40px] rounded p-1",
          isError ? "bg-red-500" : "",
        )}
      >
        {message}
      </Text>

      <Text className="mb-2">{t("signs.forgot.request.instructions")}</Text>

      <Formik
        initialValues={ForgotInitialValues}
        validationSchema={getForgotSchema(t)}
        onSubmit={(values, { resetForm }) =>
          handleSubmitSignIn(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-1/5 flex-col">
            <FormField
              className="w-full"
              name="email"
              type="email"
              placeholder={t("common.email")}
              required
            />

            <SubmitButton
              className="mt-2"
              isSubmitting={isSubmitting}
              loadingText={t("common.sending") + "..."}
              defaultText={t("common.send")}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forgot;
