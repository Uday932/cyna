"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { AVAILABILITY_STATUS } from "@/utils/constants";
import {
  availabilityValidator,
  integerValidator,
  stringValidator,
} from "@/utils/validators";
import ImageUploader from "@@/business/ImageUploader.jsx";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const createServiceInitialValues = {
  name: "Test",
  summary: "Test service",
  description: "Test description",
  technicalCharacteristics: "test de technicalCharacteristics",
  companyBenefits: "test companyBenefits",
  category: "Cat 1",
  monthlyPrice: 1,
  annualPrice: 1,
  perUserPrice: 1,
  perDevicePrice: 1,
  maxResources: 1,
  usedResources: 1,
  availability: AVAILABILITY_STATUS.AVAILABLE,
  priority: 1,
  images: [],
};

const createServiceValidationSchema = yup.object().shape({
  name: stringValidator("Nom"),
  summary: stringValidator("Résumé"),
  description: stringValidator("Description", { nullable: true }),
  technicalCharacteristics: stringValidator("Caractéristiques techniques", {
    nullable: true,
  }),
  companyBenefits: stringValidator("Avantages pour l'entreprise", {
    nullable: true,
  }),
  category: stringValidator("Catégorie", { nullable: true }),
  monthlyPrice: integerValidator(),
  annualPrice: integerValidator(),
  perUserPrice: integerValidator(),
  perDevicePrice: integerValidator(),
  maxResources: integerValidator(1),
  usedResources: integerValidator(),
  availability: availabilityValidator,
  priority: integerValidator(),
  images: yup.array().of(yup.mixed().required("Les images sont obligatoires")),
});

const ServiceCreateForm = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateSubmit = async (values, { resetForm }) => {
    setError(null);
    setMessage(null);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "images") {
        formData.append(key, values[key]);
      }
    });

    values.images?.forEach((file) => formData.append("images", file));

    try {
      await axios.post(apiRoutes.backoffice.services.create(), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Service crée avec succès !");
      resetForm();
    } catch (error) {
      console.error(error);

      const data = error.response?.data;

      if (data?.details?.length) {
        setError(data.details.join("\n"));
      } else {
        setError(
          data?.error ||
            "Une erreur interne s'est produite. Veuillez réessayer.",
        );
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={createServiceInitialValues}
        validationSchema={createServiceValidationSchema}
        onSubmit={handleCreateSubmit}
      >
        {({ setFieldValue, isSubmitting, resetForm }) => (
          <Form>
            {[
              ["name", "Nom du service", "Entrez le nom du service"],
              ["summary", "Résumé", "Entrez un résumé"],

              ["description", "Description", "Entrez la description"],
              [
                "technicalCharacteristics",
                "Caractéristiques techniques",
                "Entrez les caractéristiques",
              ],
              [
                "companyBenefits",
                "Avantages pour l'entreprise",
                "Entrez les avantages",
              ],
              ["category", "Catégorie", "Entrez la catégorie"],
            ].map(([field, label, placeholder], i) => (
              <FormField
                key={i}
                name={field}
                label={label}
                placeholder={placeholder}
              />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 space-x-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                ["monthlyPrice", "Prix mensuel", "Entrez le prix mensuel"],
                ["annualPrice", "Prix annuel", "Entrez le prix annuel"],
                [
                  "perUserPrice",
                  "Prix par utilisateur",
                  "Entrez le prix par utilisateur",
                ],
                [
                  "perDevicePrice",
                  "Prix par appareil",
                  "Entrez le prix par appareil",
                ],
                [
                  "maxResources",
                  "Ressources maximales",
                  "Entrez le nombre maximum de ressources",
                ],
                [
                  "usedResources",
                  "Ressources utilisées",
                  "Entrez le nombre de ressources utilisées",
                ],
                ["priority", "Priorité", "Entrez la priorité"],
              ].map(([name, label, placeholder], i) => (
                <FormField
                  key={i}
                  name={name}
                  label={label}
                  type="number"
                  placeholder={placeholder}
                />
              ))}

              <FormField
                name="availability"
                label="Disponibilité"
                as="select"
                placeholder="Sélectionner la disponibilité"
              >
                {Object.entries(AVAILABILITY_STATUS).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key === "AVAILABLE"
                      ? "Disponible"
                      : key === "UNAVAILABLE"
                        ? "Indisponible"
                        : "Maintenance"}
                  </option>
                ))}
              </FormField>
            </div>

            <ImageUploader setFieldValue={setFieldValue} fieldName="images" />

            <div className="flex justify-center">
              <SubmitButton
                isSubmitting={isSubmitting}
                type="submit"
                className="mt-2"
              >
                Créer le service
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>

      {error && (
        <Text color="error" className="mt-5 text-center">
          {error}
        </Text>
      )}

      {message && (
        <Text
          color="gray"
          className="mt-5 rounded bg-green-500 p-1 text-center"
        >
          {message}
        </Text>
      )}
    </div>
  );
};

export default ServiceCreateForm;
