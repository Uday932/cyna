"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import appConfig from "@/utils/appConfig.js";
import routes from "@/utils/routes.js";
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Modal from "@@/ui/Modal.jsx";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import * as yup from "yup";

const getEditUserInfoSchema = (t) => {
  return yup.object().shape({
    firstName: firstNameValidator(t),
    lastName: lastNameValidator(t),
    email: emailValidator(t),
    actualPassword: passwordValidator(t),
    newPassword: passwordValidator(t),
    repeatPassword: passwordValidator(t).oneOf(
      [yup.ref("newPassword"), null],
      t("account.confirmPasswordWarning"),
    ),
  });
};

const UserInfoModal = (props) => {
  const router = useRouter();
  const { isOpen, onClose, user, setMessageSucces } = props;
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const token = getCookie(appConfig.security.session.cookieName);

    if (!token) {
      router.push(routes.signs.signIn());
    }
  }, [router]);

  const handleEditUserInfo = async (values) => {
    setError(null);

    try {
      let msg = "";

      if (values.newPassword) {
        const { data } = await axios.patch(apiRoutes.signs.updatePassword(), {
          oldPassword: values.actualPassword,
          newPassword: values.newPassword,
        });

        msg = data.message;
      }

      if (
        values.firstName !== user.firstName ||
        values.lastName !== user.lastName ||
        values.email !== user.email
      ) {
        const { data } = await axios.patch(apiRoutes.users.update(), {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        });

        msg += values.newPassword ? " - " + data.message : data.message;
      }

      setMessageSucces(msg);
      onClose();
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            t("form.apiErrors.genericError"),
        );
      } else if (error.request) {
        setError(t("form.apiErrors.offlineError"));
      } else {
        setError(t("form.apiErrors.internalError"));
      }
    }
  };

  return (
    <Modal
      title={t("account.modalTitle")}
      isOpen={isOpen}
      onClose={onClose}
      errorMessage={error}
    >
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          actualPassword: "",
          newPassword: "",
          repeatPassword: "",
        }}
        validationSchema={getEditUserInfoSchema(t)}
        onSubmit={(values) => handleEditUserInfo(values)}
      >
        {() => (
          <Form className="flex flex-col">
            <FormField
              size="md"
              name="firstName"
              label={t("common.firstName")}
              className="w-full"
            />

            <FormField
              size="md"
              name="lastName"
              label={t("common.lastName")}
              className="w-full"
            />

            <FormField
              size="md"
              name="email"
              label={t("common.email")}
              type="email"
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="actualPassword"
              label={t("common.password")}
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="newPassword"
              label={t("common.newPassword")}
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="repeatPassword"
              label={t("common.newPasswordConfirm")}
              className="w-full"
            />

            <div className="flex justify-between space-x-4">
              <Button onClick={onClose} color="danger">
                {t("common.cancel")}
              </Button>

              <Button type="submit" color="success">
                {t("common.validate")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserInfoModal;
