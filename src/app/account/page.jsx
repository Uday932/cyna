"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { cn } from "@/lib/utils.js";
import routes from "@/utils/routes.js";
import AddressDeleteConfirmationModal from "@@/business/AddressDeleteConfirmationModal.jsx";
import AddressModal from "@@/business/AddressModal.jsx";
import UserInfoModal from "@@/business/UserInfoModal.jsx";
import Button from "@@/ui/Button";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Account = () => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isUserAddressModalOpen, setIsUserAddressModalOpen] = useState(false);
  const [updateDataMessage, setupdateDataMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const t = useTranslations();

  const handleError = (error) => {
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
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios(apiRoutes.users.single());

        setUser(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserData();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios(apiRoutes.address.all());
      setUserAddress(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address) => {
    setIsUpdate(true);
    setSelectedAddress(address);
    setIsUserAddressModalOpen(true);
    setAddressToDelete(null);
  };

  const handleDelete = (address) => {
    setIsUpdate(false);
    setSelectedAddress(null);
    setIsUserAddressModalOpen(false);
    setAddressToDelete(address);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = async (addressToDelete) => {
    try {
      await axios.delete(apiRoutes.address.delete(addressToDelete.id));

      if (addressToDelete.isDefault && userAddress.length > 1) {
        await fetchAddresses();
      } else {
        setUserAddress((prev) =>
          prev.filter((addr) => addr.id !== addressToDelete.id),
        );
      }

      setShowDeleteModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Text size="title" className="mt-10">
        {t("account.title")}
      </Text>

      <Text className={cn("min-h-[40px] rounded p-1", isError && "bg-red-500")}>
        {message}
      </Text>

      {isError && !user && (
        <Link href={routes.home()}>{t("navigation.goToHomePage")}</Link>
      )}

      {user && (
        <div className="flex flex-col gap-4 border-2 border-white/30 p-2 rounded-xl shadow-xl  min-w-[450px] mx-auto">
          <Text size="subtitle" className=" text-center">
            {t("common.myDetails")}
          </Text>

          <div className="flex flex-col gap-2 h-full p-2 rounded-xl">
            <Text label={t("common.firstName")}>{user.firstName}</Text>

            <Text label={t("common.lastName")}>{user.lastName}</Text>

            <Text label={t("common.email")}>{user.email}</Text>

            <Text label={t("common.password")}>***********</Text>

            <div className="flex justify-center">
              <Button
                onClick={() => setIsUserInfoModalOpen(true)}
                className="bg-button"
              >
                {t("common.edit")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col my-10 shadow-xl border-2 border-white/30 rounded-xl">
        <Text size="subtitle" className="my-2 text-center">
          {t("common.myAddresses")}
        </Text>

        {userAddress && (
          <div className="p-10 flex flex-wrap gap-4 px-5">
            <Button
              onClick={() => {
                setIsUpdate(false);
                setSelectedAddress(null);
                setIsUserAddressModalOpen(true);
              }}
              className="w-[300px] min-h-[330px] border-2 border-slate-400 border-dashed rounded-xl"
              color="none"
            >
              {t("account.addAddress")}
            </Button>

            {userAddress?.length > 0 &&
              userAddress.map(
                (address, index) =>
                  address && (
                    <div
                      key={index}
                      className="flex flex-col w-[300px] min-h-[330px] border-2 border-slate-400 rounded-xl"
                    >
                      {address.isDefault && (
                        <Text className="border-b-2 p-2 border-slate-400">
                          {t("common.byDefault")}
                        </Text>
                      )}

                      <div className="flex flex-col gap-2 p-2 flex-grow">
                        <Text className="font-semibold">
                          {address.firstName} {address.lastName}
                        </Text>
                        <Text className="text-wrap max-w-[250px]">
                          {address.addressLine1}
                        </Text>
                        {address.addressLine2 && (
                          <Text>{address.addressLine2}</Text>
                        )}
                        <Text>
                          {address.city}, {address.postalCode}
                        </Text>
                        <Text>{address.country}</Text>
                        <Text label={t("common.mobileNumber")}>
                          {address.mobile}
                        </Text>
                      </div>

                      <div className="flex justify-center space-x-4 mb-4">
                        <Button onClick={() => handleEdit(address)}>
                          {t("common.edit")}
                        </Button>

                        <Button
                          onClick={() => handleDelete(address)}
                          color="danger"
                        >
                          {t("common.delete")}
                        </Button>
                      </div>
                    </div>
                  ),
              )}
          </div>
        )}
      </div>

      {updateDataMessage && (
        <Text className="text-center bg-green-500 p-1 rounded-lg">
          {updateDataMessage}
        </Text>
      )}

      {user && (
        <UserInfoModal
          isOpen={isUserInfoModalOpen}
          onClose={() => setIsUserInfoModalOpen(false)}
          user={user}
          setMessageSucces={setupdateDataMessage}
        />
      )}

      {userAddress && (
        <AddressModal
          isOpen={isUserAddressModalOpen}
          onClose={() => setIsUserAddressModalOpen(false)}
          setUserAddress={setUserAddress}
          selectedAddress={selectedAddress}
          isUpdate={isUpdate}
        />
      )}

      <AddressDeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        addressToDelete={addressToDelete}
        onConfirmDelete={handleDeleteConfirmation}
      />
    </div>
  );
};

export default Account;
