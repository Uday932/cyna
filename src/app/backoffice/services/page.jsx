"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { cn } from "@/lib/utils.js";
import {
  CURRENCY_SYMBOL,
  SERVICE_COLUMN_TYPES,
  SORT_DIRECTION,
} from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import ServiceDeleteConfirmationModal from "@@/backoffice/ServiceDeleteConfirmationModal.jsx";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Input from "@@/ui/Input.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: SORT_DIRECTION.NONE,
  });

  const isAllSelected = useMemo(
    () => selectedItems.length === services.length && services.length > 0,
    [selectedItems.length, services.length],
  );

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(apiRoutes.services.all());
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.response?.data?.error || "Unable to recover service.");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const handleMultipleDeleteService = useCallback(() => {
    if (selectedItems.length === 0) {
      return;
    }

    setError(null);
    setServiceToDelete(selectedItems);
    setShowDeleteModal(true);
  }, [selectedItems]);

  const handleSingleDeleteService = useCallback((serviceId) => {
    setError(null);
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirmation = async (serviceIds) => {
    try {
      if (Array.isArray(serviceIds)) {
        await Promise.all(
          serviceIds.map((id) =>
            axios.delete(apiRoutes.backoffice.services.delete(id)),
          ),
        );

        setServices((prev) =>
          prev.filter((service) => !serviceIds.includes(service.id)),
        );

        setSelectedItems([]);
      } else {
        await axios.delete(
          apiRoutes.backoffice.services.delete(serviceToDelete),
        );

        setServices((prev) =>
          prev.filter((service) => service.id !== serviceToDelete),
        );
      }
      setShowDeleteModal(false);
    } catch (error) {
      setError(error.response.data.error || "Unable to delete service.");
    }
  };

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleSelectAll = useCallback(
    (e) => {
      setSelectedItems(e.target.checked ? services.map((s) => s.id) : []);
    },
    [services],
  );

  const handleSelectChange = useCallback((e, itemId) => {
    const { checked } = e.target;

    setSelectedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id != itemId),
    );
  }, []);

  const conditionalText = useCallback((key, value, length = 50) => {
    if (value == null) return "";

    let text = String(value);

    if (SERVICE_COLUMN_TYPES.PRICE_KEYS.includes(key)) {
      text = value + CURRENCY_SYMBOL;
    } else if (SERVICE_COLUMN_TYPES.DATE_KEYS.includes(key)) {
      text = dateFormatter.format(new Date(value));
    }

    return text.length > length ? text.slice(0, length) + "..." : text;
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = SORT_DIRECTION.ASC;

      if (prev.key === key) {
        if (prev.direction === SORT_DIRECTION.ASC) {
          direction = SORT_DIRECTION.DESC;
        } else if (prev.direction === SORT_DIRECTION.DESC) {
          direction = SORT_DIRECTION.NONE;
        }
      }

      return { key, direction };
    });
  };

  const getSortIcon = (key) => {
    if (
      key !== sortConfig.key ||
      sortConfig.direction === SORT_DIRECTION.NONE
    ) {
      return null;
    }

    const imageProps = {
      width: 25,
      height: 25,
      className: "inline-block align-middle",
      alt:
        sortConfig.direction === SORT_DIRECTION.ASC ? "up arrow" : "down arrow",
      src:
        sortConfig.direction === SORT_DIRECTION.ASC
          ? "/icons/up-arrow.png"
          : "/icons/down-arrow.png",
    };

    return <Image {...imageProps} />;
  };

  const sortedServices = useMemo(() => {
    if (sortConfig.direction === SORT_DIRECTION.NONE || !sortConfig.key) {
      return [...services];
    }

    const { key, direction } = sortConfig;

    const multiplier = direction === SORT_DIRECTION.ASC ? 1 : -1;

    return [...services].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (SERVICE_COLUMN_TYPES.DATE_KEYS.includes(key)) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else if (
        [
          ...SERVICE_COLUMN_TYPES.NUMERIC_KEYS,
          ...SERVICE_COLUMN_TYPES.PRICE_KEYS,
        ].includes(key)
      ) {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      } else if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = (valueB || "").toLowerCase();
      }

      if (valueA < valueB) return -1 * multiplier;
      if (valueA > valueB) return 1 * multiplier;
      return 0;
    });
  }, [services, sortConfig]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-lg bg-gray-300"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex max-w-xs flex-col justify-center py-10 p-1 md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
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
                  alt="Delete"
                />
              </Button>
              <Link href={routes.backoffice.services.create()} noUnderline>
                <Image
                  width={35}
                  height={35}
                  src="/icons/add.png"
                  alt="Create service"
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
                        !SERVICE_COLUMN_TYPES.IGNORED_COLUMNS.includes(key) && (
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
                  <tr key={service.id} className="border-t-2 border-gray-500">
                    <td className="px-1.5">
                      <Input
                        type="checkbox"
                        checked={selectedItems.includes(service.id)}
                        onChange={(e) => handleSelectChange(e, service.id)}
                      />
                    </td>

                    {Object.keys(service).map(
                      (column) =>
                        !SERVICE_COLUMN_TYPES.IGNORED_COLUMNS.includes(
                          column,
                        ) && (
                          <td
                            key={column}
                            className="border-x-2 border-gray-500"
                          >
                            <Text
                              color={
                                service[column] === 0 &&
                                SERVICE_COLUMN_TYPES.NUMERIC_KEYS.includes(
                                  column,
                                )
                                  ? "error"
                                  : "white"
                              }
                              className={cn(
                                SERVICE_COLUMN_TYPES.NUMERIC_KEYS.includes(
                                  column,
                                ) && "font-bold",
                                "px-1",
                                !SERVICE_COLUMN_TYPES.LONG_TEXT_COLUMN.includes(
                                  column,
                                ) && "text-center",
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
                            "see details",
                            "/icons/view.png",
                          ],
                          [
                            routes.backoffice.services.edit(service.id),
                            "Edit",
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
                          onClick={() => handleSingleDeleteService(service.id)}
                          className="rounded-xl shadow-none"
                        >
                          <Image
                            width={20}
                            height={20}
                            src="/icons/delete.png"
                            alt="Delete"
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
          <Text className="text-center">No service found</Text>
          <Link href={routes.backoffice.services.create()}>
            Create a new service
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
