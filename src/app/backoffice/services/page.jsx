"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { SERVICE_COLUMN_TYPES, SORT_DIRECTION } from "@/utils/constants.js";
import ServiceDeleteConfirmationModal from "@@/backoffice/ServiceDeleteConfirmationModal.jsx";
import ServiceTable from "@@/backoffice/topServices/ServiceTable.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SCROLL_DELAY_MS = 100;
const HIGHLIGHT_DURATION_MS = 1000;

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTopServiceDeleteModal, setShowTopServiceDeleteModal] =
    useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTopServices, setSelectedTopServices] = useState([]);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [topServiceToDelete, setTopServiceToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: SORT_DIRECTION.NONE,
  });
  const [highlightedServiceId, setHighlightedServiceId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const servicesTableRef = useRef(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        setLoading(true);
        const { data } = await axios(url);
        setData(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.response?.data?.error || "Unable to recover data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(apiRoutes.services.all(), setServices);
    fetchData(apiRoutes.services.top.all(), setTopServices);
  }, []);

  const highlightAndScrollToService = useCallback((serviceId) => {
    setHighlightedServiceId(serviceId);

    setTimeout(() => {
      const serviceRow = document.getElementById(`service-row-${serviceId}`);

      if (serviceRow) {
        serviceRow.scrollIntoView({ behavior: "smooth", block: "center" });

        if (servicesTableRef.current) {
          servicesTableRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      setTimeout(() => {
        setHighlightedServiceId(null);
      }, HIGHLIGHT_DURATION_MS);
    }, SCROLL_DELAY_MS);
  }, []);

  const handleSelectAll = (items, setSelected) => (e) => {
    setSelected(e.target.checked ? items.map((s) => s.id) : []);
  };

  const handleSelectChange = (setSelected) => (e, id) => {
    const { checked } = e.target;

    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  const deleteConfigs = {
    service: {
      ids: serviceToDelete,
      selected: selectedServices,
      setToDelete: setServiceToDelete,
      setSelected: setSelectedServices,
      setShowModal: setShowDeleteModal,
      setItems: setServices,
      apiRoute: apiRoutes.backoffice.services.delete,
      updateTopServices: true,
    },
    topService: {
      ids: topServiceToDelete,
      selected: selectedTopServices,
      setToDelete: setTopServiceToDelete,
      setSelected: setSelectedTopServices,
      setShowModal: setShowTopServiceDeleteModal,
      setItems: setTopServices,
      apiRoute: apiRoutes.backoffice.services.top.delete,
      updateTopServices: false,
    },
  };

  const handleDeleteGeneric = (key, itemId = null) => {
    const config = deleteConfigs[key];
    setError(null);

    const itemsToDelete = itemId ?? config.selected;

    if (
      !itemsToDelete ||
      (Array.isArray(itemsToDelete) && itemsToDelete.length === 0)
    ) {
      return;
    }

    config.setToDelete(itemsToDelete);
    config.setShowModal(true);
  };

  const handleDeleteConfirmationGeneric = async (key) => {
    const config = deleteConfigs[key];
    const ids = config.ids;

    setIsDeleting(true);

    try {
      if (Array.isArray(ids)) {
        await Promise.all(ids.map((id) => axios.delete(config.apiRoute(id))));
        config.setItems((prev) =>
          prev.filter((item) => !ids.includes(item.id)),
        );
        config.setSelected([]);
      } else {
        await axios.delete(config.apiRoute(ids));
        config.setItems((prev) => prev.filter((item) => item.id !== ids));
      }

      if (config.updateTopServices) {
        setTopServices((prev) =>
          prev.filter((tp) =>
            Array.isArray(ids)
              ? !ids.includes(tp.serviceId)
              : ids !== tp.serviceId,
          ),
        );
      }
    } catch (error) {
      setError(error.response?.data?.error || "Unable to delete item.");
    } finally {
      setIsDeleting(false);
      config.setShowModal(false);
    }
  };

  // Functions for services

  const handleDeleteService = (id) => handleDeleteGeneric("service", id);

  const handleDeleteServiceConfirmation = () =>
    handleDeleteConfirmationGeneric("service");

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

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

  const getSortDirection = (key) => {
    if (key !== sortConfig.key || sortConfig.direction === SORT_DIRECTION.NONE)
      return null;

    return sortConfig.direction;
  };

  // Functions for top services

  const handleDeleteTopService = (id) => handleDeleteGeneric("topService", id);

  const handleDeleteTopServiceConfirmation = () =>
    handleDeleteConfirmationGeneric("topService");

  const handleCancelDeleteTopService = useCallback(() => {
    setShowTopServiceDeleteModal(false);
  }, []);

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

  const servicesColumns = services.length
    ? [
        ...Object.keys(services[0])
          .filter((key) => !SERVICE_COLUMN_TYPES.IGNORED_COLUMNS.includes(key))
          .map((key) => ({ key, label: key })),
        { key: "action", label: "" },
      ]
    : [];

  const topServiceColumns = topServices.length
    ? [
        { key: "id", label: "id" },
        { key: "service name", label: "service name" },
        ...Object.keys(topServices[0])
          .filter(
            (key) => typeof topServices[0][key] !== "object" && key !== "id",
          )
          .map((key) => ({ key, label: key })),
        { key: "action", label: "" },
      ]
    : [];

  return (
    <div className="w-full mx-auto flex max-w-xs flex-col justify-center py-10 p-1 md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
      <Text color="error" className="text-center">
        {error}
      </Text>

      <div ref={servicesTableRef}>
        <ServiceTable
          tableName="All Services"
          data={sortedServices}
          handleSelectAll={handleSelectAll(sortedServices, setSelectedServices)}
          columns={servicesColumns}
          getSortDirection={getSortDirection}
          onSort={handleSort}
          highlightedServiceId={highlightedServiceId}
          selectedServices={selectedServices}
          handleSelectServicesChange={handleSelectChange(setSelectedServices)}
          handleDelete={handleDeleteService}
        />
      </div>

      {sortedServices.length > 0 && (
        <ServiceTable
          tableName="Top Services"
          data={topServices}
          handleSelectAll={handleSelectAll(topServices, setSelectedTopServices)}
          columns={topServiceColumns}
          highlightAndScrollToService={highlightAndScrollToService}
          selectedServices={selectedTopServices}
          handleSelectServicesChange={handleSelectChange(
            setSelectedTopServices,
          )}
          handleDelete={handleDeleteTopService}
        />
      )}

      <ServiceDeleteConfirmationModal
        title="Are you sure you want to delete this service?"
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirmDelete={handleDeleteServiceConfirmation}
        isDeleting={isDeleting}
      />

      <ServiceDeleteConfirmationModal
        title="Are you sure you want to delete this top service?"
        isOpen={showTopServiceDeleteModal}
        onClose={handleCancelDeleteTopService}
        onConfirmDelete={handleDeleteTopServiceConfirmation}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ServicesPage;
