"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { AVAILABILITY_STATUS, CURRENCY_SYMBOL } from "@/utils/constants.js";
import {
  availabilityValidator,
  integerValidator,
  stringValidator,
} from "@/utils/validators.js";
import ImageUploader from "@@/business/ImageUploader.jsx";
import ServiceCarouselAdmin from "@@/business/ServiceCarouselAdmin.jsx";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

const editServiceSchema = yup.object().shape({
  name: stringValidator("nom", 1, 100).required(),
  summary: stringValidator("résumé", 1, 300).required(),
  description: stringValidator("description"),
  technicalCharacteristics: stringValidator("caractéristiques"),
  companyBenefits: stringValidator("avantages"),
  category: stringValidator("catégorie"),
  monthlyPrice: integerValidator().required("Prix mensuel requis"),
  annualPrice: integerValidator().required("Prix annuel requis"),
  perUserPrice: integerValidator().nullable(),
  perDevicePrice: integerValidator().nullable(),
  maxResources: integerValidator().required("Nombre max requis"),
  usedResources: integerValidator(0).required("Nombre utilisé requis"),
  availability: availabilityValidator,
  priority: integerValidator(0).required("Priorité requise"),
});

const EditService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [resetUploader, setResetUploader] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(apiRoutes.services.single(id));

        setService(data);
      } catch (err) {
        setError("Erreur lors du chargement du service.");
      }
    };

    fetchService();
  }, [id]);

  const handleEditService = async (values) => {
    setError(null);
    setMessage(null);

    const imagesHaveChanged = imageFiles.some(
      (file) => !service.images.includes(file.name),
    );

    const dataHasChanged = Object.entries(values).some(
      ([key, val]) => JSON.stringify(service[key]) !== JSON.stringify(val),
    );

    const hasChanges =
      dataHasChanged || imagesHaveChanged || imagesToDelete.length > 0;

    if (!hasChanges) {
      setMessage("Aucune modification détectée.");
      return;
    }

    let updatedService = { ...service };

    try {
      if (imagesToDelete.length > 0) {
        const { data } = await axios.delete(
          apiRoutes.backoffice.services.manageImages(service.id),
          {
            data: { imagesToDelete },
          },
        );

        updatedService = data.updatedService || updatedService;
        setService(updatedService);
      }

      if (imagesHaveChanged && imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));

        const { data } = await axios.post(
          apiRoutes.backoffice.services.manageImages(service.id),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        updatedService = data.updatedService || {
          ...updatedService,
          images: [
            ...new Set([...updatedService.images, ...data.uploadedImages]),
          ],
        };

        setService(updatedService);
      }

      await axios.patch(apiRoutes.backoffice.services.edit(service.id), {
        ...values,
        images: updatedService.images,
      });

      setService(updatedService);
      setImageFiles([]);
      setImagesToDelete([]);
      setResetUploader(true);

      setTimeout(() => setResetUploader(false), 100);
      setMessage("Service mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.error ||
          "Une erreur interne s'est produite. Veuillez réessayer.",
      );
    }
  };

  const handleFileChange = (files) => setImageFiles(files);

  if (!service) {
    return <Text>Chargement...</Text>;
  }

  return (
    <div className="w-full rounded-xl">
      <div>
        <Text size="subtitle" className="text-center">
          Modifier le service
        </Text>
      </div>
      <Formik
        initialValues={{
          ...service,
          images: service.images || [],
        }}
        validationSchema={editServiceSchema}
        onSubmit={handleEditService}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["name", "Nom"],
                ["summary", "Résumé"],
                ["category", "Catégorie"],
              ].map(([field, label]) => (
                <FormField key={field} name={field} label={label} />
              ))}
            </div>

            {[
              ["description", "Description détaillée"],
              ["technicalCharacteristics", "Caractéristiques techniques"],
              ["companyBenefits", "Avantages de l'entreprise"],
            ].map(([field, label]) => (
              <FormField
                key={field}
                name={field}
                label={label}
                type="textarea"
                className="w-full"
              />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {[
                ["monthlyPrice", `Prix mensuel ${CURRENCY_SYMBOL}`],
                ["annualPrice", `Prix annuel ${CURRENCY_SYMBOL}`],
                ["perUserPrice", `Prix par utilisateur ${CURRENCY_SYMBOL}`],
                ["perDevicePrice", `Prix par appareil ${CURRENCY_SYMBOL}`],
                ["maxResources", "Ressources max"],
                ["usedResources", "Ressources utilisées"],
              ].map(([field, label]) => (
                <FormField
                  key={field}
                  name={field}
                  label={label}
                  type="number"
                />
              ))}

              <FormField as="select" name="availability" label="Disponibilité">
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

              <FormField
                name="priority"
                label="Priorité"
                type="number"
                className="w-full"
              />
            </div>

            <div className="flex flex-col justify-center gap-10">
              {service.images && (
                <ServiceCarouselAdmin
                  images={service.images}
                  imagesToDelete={imagesToDelete}
                  setImagesToDelete={setImagesToDelete}
                />
              )}

              <ImageUploader
                ref={uploaderRef}
                setFieldValue={setFieldValue}
                fieldName="images"
              />
            </div>

            <div className="my-5 flex justify-center">
              <SubmitButton isSubmitting={isSubmitting}>Valider</SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center">
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
    </div>
  );
};

export default EditService;
