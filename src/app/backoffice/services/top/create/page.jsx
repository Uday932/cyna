"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import {
  endDateTopService,
  integerValidator,
  startDateTopService,
} from "@/utils/validators";
import FormField from "@@/ui/FormField.jsx";
import SubmitButton from "@@/ui/SubmitButton.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

const createTopServiceInitialValues = {
  serviceId: "",
  priority: "",
  startDate: "",
  endDate: "",
};

const createTopServiceValidationSchema = yup.object().shape({
  serviceId: integerValidator().required("Service is required"),
  priority: integerValidator().required("Priority is required"),
  startDate: startDateTopService.required("Start Date is required"),
  endDate: endDateTopService.min(
    yup.ref("startDate"),
    "End date must be after start date",
  ),
});

const CreateTopService = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const { data } = await axios.get(apiRoutes.services.all());
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.response?.data?.error || "Unable to recover service.");
      }
    };

    getServices();
  }, []);

  const handleCreateSubmit = async (values, { resetForm }) => {
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post(
        apiRoutes.backoffice.services.top.create(),
        values,
      );

      setMessage(data.message || "Top service created!");
      resetForm();
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Text size="title" className="text-center">
        Create top service
      </Text>

      <Formik
        initialValues={createTopServiceInitialValues}
        validationSchema={createTopServiceValidationSchema}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <FormField
                name="serviceId"
                label="Service"
                as="select"
                className="flex-1"
              >
                <option value="">-- Select a service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </FormField>

              <FormField
                name="priority"
                label="Priority"
                type="number"
                className="flex-1"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <FormField
                name="startDate"
                label="Start Date"
                type="date"
                className="flex-1"
              />
              <FormField
                name="endDate"
                label="End Date"
                type="date"
                className="flex-1"
              />
            </div>

            <div className="flex justify-center">
              <SubmitButton isSubmitting={isSubmitting}>
                Create Top Service
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>

      {error && (
        <Text color="error" className="text-center">
          {error}
        </Text>
      )}
      {message && (
        <Text color="success" className="text-center">
          {message}
        </Text>
      )}
    </div>
  );
};

export default CreateTopService;
