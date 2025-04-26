"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { AVAILABILITY_STATUS, CURRENCY_SYMBOL } from "@/utils/constants.js";
import {
  availabilityValidator,
  integerValidator,
  stringValidator,
} from "@/utils/validators.js";
import ServiceCarouselAdmin from "@@/backoffice/ServiceCarouselAdmin.jsx";
import ImageUploader from "@@/business/ImageUploader.jsx";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";

const editServiceSchema = yup.object().shape({
  name: stringValidator("nom", 1, 100).required(),
  summary: stringValidator("summary", 1, 300).required(),
  description: stringValidator("description"),
  technicalCharacteristics: stringValidator("Technical Characteristics"),
  companyBenefits: stringValidator("Company Benefits"),
  category: stringValidator("cateégory"),
  monthlyPrice: integerValidator().required("Monthly Price required"),
  annualPrice: integerValidator().required("Annual Price required"),
  perUserPrice: integerValidator().nullable(),
  perDevicePrice: integerValidator().nullable(),
  maxResources: integerValidator().required("Maximum resources required"),
  usedResources: integerValidator(0).required("Used resources required"),
  availability: availabilityValidator,
  priority: integerValidator(0).required("Priority required"),
});

const EditService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const uploaderRef = useRef(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(apiRoutes.services.single(id));

        setService(data);
      } catch (err) {
        setError("Error loading service.");
      }
    };

    fetchService();
  }, [id]);

  const handleEditService = async (values, { resetForm, setFieldValue }) => {
    setError(null);
    setMessage(null);

    let updatedService = { ...service };

    try {
      if (imagesToDelete.length > 0) {
        const { data } = await axios.delete(
          apiRoutes.backoffice.services.manageImages(service.id),
          {
            data: { imagesToDelete },
          },
        );

        updatedService = data.updatedService;
      }

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== "images") {
          formData.append(key, values[key]);
        }
      });

      values.images?.forEach((file) => formData.append("images", file));

      const patchResponse = await axios.patch(
        apiRoutes.backoffice.services.edit(service.id),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      updatedService = patchResponse.data.updatedService;

      setService(updatedService);
      setImagesToDelete([]);
      setMessage("An error has occurred");
      resetForm();
      setFieldValue("images", []);
      uploaderRef.current?.reset();
    } catch (error) {
      setError(error.response?.data?.error || "An error has occurred.");
    }
  };

  if (!service) {
    return <Text>Loading...</Text>;
  }

  return (
    <div className="w-full rounded-xl">
      <div>
        <Text size="subtitle" className="text-center">
          Edit the service
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
        {({ setFieldValue, isSubmitting, resetForm }) => (
          <Form className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["name", "Name"],
                ["summary", "Summary"],
                ["category", "Category"],
              ].map(([field, label]) => (
                <FormField key={field} name={field} label={label} />
              ))}
            </div>

            {[
              ["description", "Detailed description"],
              ["technicalCharacteristics", "Technical characteristics"],
              ["companyBenefits", "Company Benefits"],
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
                ["monthlyPrice", `Monthly price ${CURRENCY_SYMBOL}`],
                ["annualPrice", `Annual price ${CURRENCY_SYMBOL}`],
                ["perUserPrice", `Price per user ${CURRENCY_SYMBOL}`],
                ["perDevicePrice", `Price per device ${CURRENCY_SYMBOL}`],
                ["maxResources", "Maximum resources"],
                ["usedResources", "Resources used"],
              ].map(([field, label]) => (
                <FormField
                  key={field}
                  name={field}
                  label={label}
                  type="number"
                />
              ))}

              <FormField as="select" name="availability" label="Availability">
                {Object.entries(AVAILABILITY_STATUS).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key === "AVAILABLE"
                      ? "Available"
                      : key === "UNAVAILABLE"
                        ? "Unavailable"
                        : "Maintenance"}
                  </option>
                ))}
              </FormField>

              <FormField
                name="priority"
                label="Priority"
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
              <SubmitButton isSubmitting={isSubmitting}>Validate</SubmitButton>
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
