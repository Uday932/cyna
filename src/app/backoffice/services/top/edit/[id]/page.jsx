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
import { useParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import * as yup from "yup";

const editTopServiceValidationSchema = yup.object().shape({
  serviceId: integerValidator().required("Service is required"),
  priority: integerValidator().required("Priority is required"),
  startDate: startDateTopService.required("Start Date is required"),
  endDate: endDateTopService.min(
    yup.ref("startDate"),
    "End date must be after start date",
  ),
});

const EditTopService = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [topService, setTopService] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(apiRoutes.services.top.single(id));
        setTopService(data);

        const services = await axios(apiRoutes.services.all());
        setServices(services.data);
      } catch (err) {
        setError(err.response?.data?.error || "Unable to fetch data.");
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateSubmit = async (values) => {
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.patch(
        apiRoutes.backoffice.services.top.update(id),
        values,
      );

      setMessage(data.message || "Top service updated!");
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  if (!topService) return <Text>Loading...</Text>;

  return (
    <div className="flex flex-col gap-4 mb-5">
      <Text size="title" className="text-center">
        Edit top service
      </Text>

      <Formik
        initialValues={{
          serviceId: topService.serviceId.toString(),
          priority: topService.priority,
          startDate: topService.startDate.split("T")[0],
          endDate: topService.endDate?.split("T")[0] || "",
        }}
        validationSchema={editTopServiceValidationSchema}
        onSubmit={handleUpdateSubmit}
        enableReinitialize
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
                  <option key={service.id} value={service.id.toString()}>
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
                Update Top Service
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

export default EditTopService;
