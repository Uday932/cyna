"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { CURRENCY_SYMBOL } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
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
  const [selectedItems, setSelectedItems] = useState([]);
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

  const conditionalText = (key, value, length = 100) => {
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
      ) : error ? (
        <Text className="text-center text-red-500">{error}</Text>
      ) : (
        <div className="3xl:bg-red-500 mx-auto flex max-w-xs flex-col justify-center rounded-xl border-2 border-black p-1 md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
          <div className="overflow-x-auto">
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
                  {Object.keys(services[0]).map((key) => {
                    if (!IGNORED_COLUMNS.includes(key)) {
                      return (
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
                      );
                    }
                  })}
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

                    {Object.keys(service).map((column) => {
                      if (!IGNORED_COLUMNS.includes(column)) {
                        return (
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
                                NUMERIC_KEYS.includes(column) && "font-bold",
                                "px-2",
                                !LONG_TEXT_COLUMN.includes(column) &&
                                  "text-center",
                              )}
                            >
                              {conditionalText(column, service[column])}
                            </Text>
                          </td>
                        );
                      }
                    })}

                    <td className="w-[70px] min-w-[70px] px-1.5">
                      <Link
                        href={routes.backoffice.services.edit(service.id)}
                        className=""
                      >
                        <Image
                          width={35}
                          height={35}
                          src="/icons/edit.png"
                          alt="Modifier"
                          className="rounded-xl bg-button p-1"
                        ></Image>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
