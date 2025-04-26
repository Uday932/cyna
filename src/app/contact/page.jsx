"use client";
import apiRoutes from "@/apiUtils/apiRoutes";
import { getTranslatedMetadata } from "@/utils/utils.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as Yup from "yup";

const ContactInitialValues = {
  name: "",
  email: "",
  message: "",
};

const ContactPage = () => {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const t = useTranslations();

  const handleSubmitContact = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);

      await axios.post(apiRoutes.contact(), values);

      setMessage(t("contact.messageSuccess"));
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
    <div className="flex w-full flex-col items-center justify-center gap-y-4 p-6">
      <Text size="title" className="text-center">
        {t("contact.title")}
      </Text>

      {message && (
        <Text
          className={`my-2 min-h-[40px] rounded p-1 ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message}
        </Text>
      )}

      <Formik
        initialValues={ContactInitialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required(t("form.required", { field: t("common.name") }))
            .min(2, t("form.min", { field: t("common.name"), min: 2 })),
          email: Yup.string()
            .email(t("form.format.email"))
            .required(t("form.required", { field: t("common.email") })),
          message: Yup.string()
            .required(t("form.required", { field: "Message" }))
            .min(10, t("form.min", { field: "Message", min: 10 })),
        })}
        onSubmit={(values, { resetForm }) =>
          handleSubmitContact(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full max-w-md flex-col gap-4">
            <FormField
              name="name"
              placeholder={t("common.name")}
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
              name="message"
              as="textarea"
              placeholder="Message"
              className="h-32 w-full resize-none"
              required
            />

            <Button type="submit">
              {isSubmitting ? t("common.sending") : t("common.send")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactPage;
