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
  name: "",
  summary: "",
  description: "",
  technicalCharacteristics: "",
  companyBenefits: "",
  category: "",
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
const t = undefined;

const createServiceValidationSchema = yup.object().shape({
  name: stringValidator(t, "Name"),
  summary: stringValidator(t, "Summary"),
  description: stringValidator(t, "Detailed description", { required: false }),
  technicalCharacteristics: stringValidator(t, "Technical characteristics", {
    required: false,
  }),
  companyBenefits: stringValidator(t, "Company Benefits", {
    required: false,
  }),
  category: stringValidator(t, "Category", { required: false }),
  monthlyPrice: integerValidator(),
  annualPrice: integerValidator(),
  perUserPrice: integerValidator(),
  perDevicePrice: integerValidator(),
  maxResources: integerValidator(1),
  usedResources: integerValidator(),
  availability: availabilityValidator,
  priority: integerValidator(),
  images: yup.array().of(yup.mixed().required("Images are required")),
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
      const { data } = await axios.post(
        apiRoutes.backoffice.services.create(),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setMessage(data.message);
      resetForm();
    } catch (error) {
      console.error(error);

      const data = error.response?.data;

      if (data?.details?.length) {
        setError(data.details.join("\n"));
      } else {
        setError(
          data?.error || "An internal error has occurred. Please try again.",
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
              ["name", "Service Name"],
              ["summary", "Summary"],
              ["description", "Description"],
              ["technicalCharacteristics", "Technical Characteristics"],
              ["companyBenefits", "Company Benefits"],
              ["category", "Category"],
            ].map(([field, label], i) => (
              <FormField key={i} name={field} label={label} />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 space-x-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                ["monthlyPrice", "Monthly Price"],
                ["annualPrice", "Annual Price"],
                ["perUserPrice", "Price per user"],
                ["perDevicePrice", "Price per device"],
                ["maxResources", "Maximum resources"],
                ["usedResources", "Used resources"],
                ["priority", "Priority"],
              ].map(([name, label], i) => (
                <FormField key={i} name={name} label={label} type="number" />
              ))}

              <FormField name="availability" label="Availability" as="select">
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
            </div>

            <ImageUploader setFieldValue={setFieldValue} fieldName="images" />

            <div className="flex justify-center">
              <SubmitButton isSubmitting={isSubmitting} className="mt-2">
                Create the service
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
