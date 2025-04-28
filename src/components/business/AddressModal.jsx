"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import {
  firstNameValidator,
  isDefaultValidator,
  lastNameValidator,
  mobileValidator,
  postalCodeValidator,
  stringValidator,
} from "@/utils/validators.js";
import Button from "@@/ui/Button.jsx";
import FormField from "@@/ui/FormField.jsx";
import Modal from "@@/ui/Modal.jsx";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as yup from "yup";

const getAddressSchema = (t) => {
  return yup.object().shape({
    firstName: firstNameValidator(t),
    lastName: lastNameValidator(t),
    addressLine1: stringValidator(t, t("account.addressLine1")),
    addressLine2: stringValidator(t, t("account.addressLine2")),
    city: stringValidator(t, t("common.city"), { min: 2 }),
    postalCode: postalCodeValidator(t),
    country: stringValidator(t, t("common.country")),
    mobile: mobileValidator(t, { required: false }),
    isDefault: isDefaultValidator(),
  });
};

const AddressModal = ({
  isOpen,
  onClose,
  setUserAddress,
  selectedAddress,
  isUpdate,
}) => {
  const [error, setError] = useState(null);
  const t = useTranslations();

  const handleUpsertAddress = async (values) => {
    setError(null);

    try {
      const { data } = await axios.post(apiRoutes.address.upsert(), values);

      setUserAddress((prev) => {
        if (!prev) {
          return [data];
        }

        let updatedAddresses = prev;

        if (data.isDefault) {
          updatedAddresses = updatedAddresses.map((address) => ({
            ...address,
            isDefault: false,
          }));
        }

        updatedAddresses = updatedAddresses.filter(
          (addr) => addr.id !== data.id,
        );

        return [...updatedAddresses, data];
      });

      onClose();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || t("form.apiErrors.genericError"));
      } else if (error.request) {
        setError(t("form.apiErrors.offlineError"));
      } else {
        setError(t("form.apiErrors.internalError"));
      }
    }
  };

  return (
    <Modal
      title={isUpdate ? t("account.editAddress") : t("account.addAddress")}
      isOpen={isOpen}
      onClose={onClose}
      errorMessage={error}
    >
      <Formik
        initialValues={{
          id: selectedAddress?.id ?? undefined,
          firstName: selectedAddress?.firstName ?? "",
          lastName: selectedAddress?.lastName ?? "",
          addressLine1: selectedAddress?.addressLine1 ?? "",
          addressLine2: selectedAddress?.addressLine2 ?? "",
          city: selectedAddress?.city ?? "",
          postalCode: selectedAddress?.postalCode ?? "",
          country: selectedAddress?.country ?? "",
          mobile: selectedAddress?.mobile ?? "",
          isDefault: selectedAddress?.isDefault ?? false,
        }}
        validationSchema={getAddressSchema(t)}
        onSubmit={handleUpsertAddress}
      >
        {() => (
          <Form className="flex flex-col space-y-2">
            <div className="flex space-x-4">
              <FormField
                name="firstName"
                label={t("common.firstName")}
                className="flex-1"
              />
              <FormField
                name="lastName"
                label={t("common.lastName")}
                className="flex-1"
              />
            </div>

            <FormField name="addressLine1" label={t("account.addressLine1")} />
            <FormField name="addressLine2" label={t("account.addressLine2")} />

            <div className="flex justify-center space-x-4">
              <FormField
                name="city"
                label={t("common.city")}
                className="flex-1"
              />
              <FormField
                name="postalCode"
                label={t("common.postalCode")}
                className="flex-1"
              />
              <FormField
                name="country"
                label={t("common.country")}
                className="flex-1"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <FormField name="mobile" label={t("common.mobileNumber")} />
              <FormField
                type="checkbox"
                name="isDefault"
                label={t("account.setDefault")}
              />
            </div>

            <div className="flex justify-center space-x-4 mt-4">
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

export default AddressModal;
