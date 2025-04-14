"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { CURRENCY_SYMBOL } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import ServiceDeleteConfirmationModal from "@@/backoffice/ServiceDeleteConfirmationModal.jsx";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Input from "@@/ui/Input.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

const PRICE_KEYS = [
  "monthlyPrice",
  "annualPrice",
  "perUserPrice",
  "perDevicePrice",
];

const NUMERIC_KEYS = [
  ...PRICE_KEYS,
  "maxResources",
  "usedResources",
  "priority",
];

const LONG_TEXT_COLUMN = [
  "summary",
  "description",
  "technicalCharacteristics",
  "companyBenefits",
];

const DATE_KEYS = ["updatedAt", "createdAt"];
const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const IGNORED_COLUMNS = ["images"];

const SORT_DIRECTION = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC",
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const isAllSelected = selectedItems.length === services.length;
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: SORT_DIRECTION.NONE,
  });

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(apiRoutes.services.all());
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || "Une erreur est survenue.");
        } else {
          setError("Impossible de récupérer le service.");
        }
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const handleMultipleDeleteService = async () => {
    setError(null);

    try {
      await Promise.all(
        selectedItems.map((id) =>
          axios.delete(apiRoutes.backoffice.services.delete(id)),
        ),
      );
      setServices((prev) => prev.filter((s) => !selectedItems.includes(s.id)));
      setSelectedItems([]);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Une erreur est survenue.");
      } else {
        setError("Impossible de récupérer le service.");
      }
    }
  };

  const handleDeleteService = async (serviceId) => {
    setError(null);
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(apiRoutes.backoffice.services.delete(serviceToDelete));

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceToDelete),
      );

      setShowDeleteModal(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Une erreur est survenue.");
      } else {
        setError("Impossible de supprimer le service.");
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSelectAll = useCallback(
    (e) => {
      if (e.target.checked) {
        setSelectedItems(services.map((s) => s.id));
      } else {
        setSelectedItems([]);
      }
    },
    [services],
  );

  const handleSelectChange = useCallback((e, itemId) => {
    const { checked } = e.target;

    setSelectedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id != itemId),
    );
  }, []);

  const conditionalText = (key, value, length = 50) => {
    let text = value ?? "";

    if (PRICE_KEYS.includes(key)) {
      text = value + CURRENCY_SYMBOL;
    }

    if (DATE_KEYS.includes(key)) {
      const date = new Date(value);

      text = dateFormatter.format(date);
    }

    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const getSortIcon = (key) => {
    if (key !== sortConfig.key) {
      return null;
    }

    if (key === sortConfig.key) {
      if (sortConfig.direction === SORT_DIRECTION.ASC) {
        return (
          <Image
            src="/icons/up-arrow.png"
            width={25}
            height={25}
            alt="up arrow"
            className="inline-block align-middle"
          />
        );
      } else if (sortConfig.direction === SORT_DIRECTION.DESC) {
        return (
          <Image
            src="/icons/down-arrow.png"
            width={25}
            height={25}
            alt="up arrow"
            className="inline-block align-middle"
          />
        );
      }
    }

    return null;
  };

  const compareValues = (key, direction, a, b) => {
    let valueA = a[key];
    let valueB = b[key];

    if (DATE_KEYS.includes(key)) {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    if (NUMERIC_KEYS.includes(key)) {
      valueA = parseFloat(valueA) || 0;
      valueB = parseFloat(valueB) || 0;
    }

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB?.toLowerCase() || "";
    }

    if (valueA < valueB) {
      return direction === SORT_DIRECTION.ASC ? -1 : 1;
    }
    if (valueA > valueB) {
      return direction === SORT_DIRECTION.ASC ? 1 : -1;
    }
    return 0;
  };

  const handleSort = (key) => {
    let direction = SORT_DIRECTION.ASC;

    if (sortConfig.key === key) {
      if (sortConfig.direction === SORT_DIRECTION.ASC) {
        direction = SORT_DIRECTION.DESC;
      } else if (sortConfig.direction === SORT_DIRECTION.DESC) {
        direction = SORT_DIRECTION.NONE;
      } else {
        direction = SORT_DIRECTION.ASC;
      }
    }

    setSortConfig({ key, direction });
  };

  const sortedServices = useMemo(() => {
    if (sortConfig.direction === SORT_DIRECTION.NONE || !sortConfig.key) {
      return [...services];
    }

    return [...services].sort((a, b) =>
      compareValues(sortConfig.key, sortConfig.direction, a, b),
    );
  }, [services, sortConfig]);

  return (
    <div className="w-full py-10">
      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-lg bg-gray-300"
            ></div>
          ))}
        </div>
      ) : (
        <div className="3xl:bg-red-500 mx-auto flex max-w-xs flex-col justify-center p-1 md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
          {services.length > 0 ? (
            <>
              <div className="my-2">
                <Text color="error" className="text-center">
                  {error}
                </Text>

                <div className="ml-2 flex flex-row space-x-2">
                  <Button
                    onClick={handleMultipleDeleteService}
                    className="shadow-none"
                    color={selectedItems.length === 0 ? "disabled" : "button"}
                  >
                    <Image
                      width={20}
                      height={20}
                      src="/icons/delete.png"
                      alt="Supprimer"
                    />
                  </Button>
                  <Link href={routes.backoffice.services.create()} noUnderline>
                    <Image
                      width={35}
                      height={35}
                      src="/icons/add.png"
                      alt="Créer service"
                      className="rounded bg-button p-2"
                    />
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border-2 border-t-2 border-black">
                <table className="mb-4 w-full table-auto">
                  <thead>
                    <tr className="h-10">
                      <th className="px-1.5">
                        <Input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {services.length > 0 &&
                        Object.keys(services[0]).map(
                          (key) =>
                            !IGNORED_COLUMNS.includes(key) && (
                              <th
                                key={key}
                                className="px-6"
                                onClick={() => handleSort(key)}
                              >
                                <div className="flex flex-row items-center justify-center gap-x-2">
                                  <Text className="flex cursor-pointer flex-row items-center justify-center first-letter:uppercase">
                                    {key}
                                  </Text>
                                  {getSortIcon(key)}
                                </div>
                              </th>
                            ),
                        )}
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedServices.map((service) => (
                      <tr
                        key={service.id}
                        className="border-t-2 border-gray-500"
                      >
                        <td className="px-1.5">
                          <Input
                            type="checkbox"
                            checked={selectedItems.includes(service.id)}
                            onChange={(e) => handleSelectChange(e, service.id)}
                          />
                        </td>

                        {services.length > 0 &&
                          Object.keys(service).map(
                            (column) =>
                              !IGNORED_COLUMNS.includes(column) && (
                                <td
                                  key={column}
                                  className="border-x-2 border-gray-500"
                                >
                                  <Text
                                    color={
                                      service[column] === 0 &&
                                      NUMERIC_KEYS.includes(column)
                                        ? "error"
                                        : "white"
                                    }
                                    className={clsx(
                                      NUMERIC_KEYS.includes(column) &&
                                        "font-bold",
                                      "px-1",
                                      !LONG_TEXT_COLUMN.includes(column) &&
                                        "text-center",
                                    )}
                                  >
                                    {conditionalText(column, service[column])}
                                  </Text>
                                </td>
                              ),
                          )}

                        <td>
                          <div className="flex w-[70px] min-w-[70px] flex-col items-center justify-center gap-y-2 py-1">
                            {[
                              [
                                routes.backoffice.services.single(service.id),
                                "voir détail",
                                "/icons/view.png",
                              ],
                              [
                                routes.backoffice.services.edit(service.id),
                                "Modifier",
                                "/icons/edit.png",
                              ],
                            ].map(([link, label, icon], i) => (
                              <Link key={i} href={link} noUnderline>
                                <Image
                                  width={35}
                                  height={35}
                                  src={icon}
                                  alt={label}
                                  className="rounded-xl bg-button p-1"
                                />
                              </Link>
                            ))}

                            <Button
                              onClick={() => handleDeleteService(service.id)}
                              className="rounded-xl bg-button p-1 shadow-none"
                            >
                              <Image
                                width={20}
                                height={20}
                                src="/icons/delete.png"
                                alt="Supprimer"
                              />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ServiceDeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={handleCancelDelete}
                serviceToDelete={serviceToDelete}
                onConfirmDelete={handleDeleteConfirmation}
              />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <Text className="text-center">Aucun service trouvé</Text>
              <Link href={routes.backoffice.services.create()}>
                Créer un nouveau service
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
