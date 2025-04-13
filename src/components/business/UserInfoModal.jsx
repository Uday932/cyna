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
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import * as yup from "yup";

const EditUserInfoSchema = yup.object().shape({
  firstName: firstNameValidator.required("Le prénom est requis"),
  lastName: lastNameValidator.required("Le nom est requis"),
  email: emailValidator.required("L'email est requis"),
  actualPassword: passwordValidator.label("Mot de passe actuel"),
  newPassword: passwordValidator.label("Nouveau mot de passe"),
  repeatPassword: passwordValidator
    .label("Répéter mot de passe")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Les mots de passe doivent correspondre",
    ),
});

const UserInfoModal = (props) => {
  const router = useRouter();
  const { isOpen, onClose, user, setMessageSucces } = props;
  const [error, setError] = useState(null);

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
        setError(error.response.data.error);
      } else if (error.request) {
        setError(
          "Le serveur est actuellement hors ligne. Veuillez réessayer plus tard.",
        );
      } else {
        setError("Une erreur interne s'est produite.");
      }
    }
  };

  return (
    <Modal
      title="Modifier mes informations"
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
        validationSchema={EditUserInfoSchema}
        onSubmit={(values) => handleEditUserInfo(values)}
      >
        {() => (
          <Form className="flex flex-col">
            <FormField
              size="md"
              name="firstName"
              placeholder="firstName"
              label="Prénom"
              className="w-full"
            />

            <FormField
              size="md"
              name="lastName"
              placeholder="lastName"
              label="Nom"
              className="w-full"
            />

            <FormField
              size="md"
              name="email"
              placeholder="email"
              label="Email"
              type="email"
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="actualPassword"
              placeholder="oldPassword"
              label="Mot de passe"
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="newPassword"
              placeholder="newPassword"
              label="Nouveau mot de passe"
              className="w-full"
            />

            <FormField
              size="md"
              type="password"
              name="repeatPassword"
              placeholder="repeatPassword"
              label="Confirmer le mot de passe"
              className="w-full"
            />

            <div className="flex justify-between space-x-4">
              <Button onClick={onClose} color="danger">
                Annuler
              </Button>

              <Button type="submit" color="success">
                Valider
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserInfoModal;
