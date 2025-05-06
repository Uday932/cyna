import { cn } from "@/lib/utils.js";
import {
  CURRENCY_SYMBOL,
  SERVICE_COLUMN_TYPES,
  SORT_DIRECTION,
} from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Input from "@@/ui/Input.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const textColor = (column, value) => {
  return value === 0 && SERVICE_COLUMN_TYPES.NUMERIC_KEYS.includes(column)
    ? "error"
    : "white";
};

const ServiceTable = ({
  tableName,
  data,
  handleSelectAll,
  columns,
  getSortDirection,
  onSort,
  highlightedServiceId,
  highlightAndScrollToService,
  selectedServices,
  handleSelectServicesChange,
  handleDelete,
}) => {
  const conditionalText = (key, value, length = 50) => {
    if (value == null) return "";

    let text = String(value);

    if (SERVICE_COLUMN_TYPES.PRICE_KEYS.includes(key)) {
      text = value + CURRENCY_SYMBOL;
    } else if (SERVICE_COLUMN_TYPES.DATE_KEYS.includes(key)) {
      text = dateFormatter.format(new Date(value));
    }

    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const multipleDeleteButtonColor = (selectedCount) => {
    return selectedCount === 0 ? "disabled" : "button";
  };

  const serviceType = tableName === "All Services" ? "top service" : "service";

  const createApiRoute =
    tableName === "All Services"
      ? routes.backoffice.services.create()
      : routes.backoffice.services.top.create();

  const isAllSelected =
    selectedServices.length === data.length && data.length > 0;

  const renderSortIcon = (direction) => {
    if (!direction) return null;

    let dire, label;

    if (direction === SORT_DIRECTION.ASC) {
      dire = "down";
      label = "sorted ascending";
    } else if (direction === SORT_DIRECTION.DESC) {
      dire = "up";
      label = "sorted descending";
    }

    return (
      <Image
        width={25}
        height={25}
        className="inline-block align-middle"
        alt={`${dire} arrow`}
        src={`/icons/${dire}-arrow.svg`}
        aria-label={label}
      />
    );
  };

  return (
    <div>
      <Text size="title" className="mt-5 text-center">
        {tableName}
      </Text>

      {data.length > 0 ? (
        <div className="border-2 border-t-2 border-black rounded-xl">
          <div className="m-2 flex flex-row space-x-2">
            <Button
              onClick={() => handleDelete()}
              color={multipleDeleteButtonColor(selectedServices.length)}
              className="shadow-none"
              disabled={selectedServices.length === 0}
            >
              <Image
                width={20}
                height={20}
                src="/icons/delete.png"
                alt="Delete"
              />
            </Button>
            <Link href={createApiRoute} noUnderline>
              <Image
                width={35}
                height={35}
                src="/icons/add.png"
                alt="Create service"
                className="rounded bg-button p-2"
              />
            </Link>
          </div>

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
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-6"
                      onClick={() => onSort?.(col.key)}
                    >
                      <div className="flex flex-row items-center justify-center gap-x-2">
                        <Text className="flex cursor-pointer flex-row items-center justify-center first-letter:uppercase">
                          {col.label}
                        </Text>

                        {getSortDirection &&
                          renderSortIcon(getSortDirection(col.key))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => {
                  const isHighlighted = highlightedServiceId === item.id;

                  return (
                    <tr
                      key={idx}
                      {...(tableName === "All Services" && {
                        id: `service-row-${item.id}`,
                      })}
                      className={cn(
                        "border-t-2 border-gray-500",
                        isHighlighted &&
                          "animate-pulse bg-[#80FFEA] transition-all duration-300 ",
                      )}
                    >
                      <td className="px-1.5">
                        <Input
                          type="checkbox"
                          checked={selectedServices.includes(item.id)}
                          onChange={(e) =>
                            handleSelectServicesChange(e, item.id)
                          }
                        />
                      </td>

                      {columns.map((col) => {
                        if (col.key === "action") {
                          return (
                            <td
                              key="action"
                              className="border-x-2 border-gray-500"
                            >
                              <div className="flex w-[70px] min-w-[70px] flex-col items-center justify-center gap-y-2 py-1">
                                {tableName === "All Services" ? (
                                  <>
                                    {[
                                      [
                                        routes.backoffice.services.single(
                                          item.id,
                                        ),
                                        "see details",
                                        "/icons/view.png",
                                      ],
                                      [
                                        routes.backoffice.services.edit(
                                          item.id,
                                        ),
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
                                      onClick={() => handleDelete(item.id)}
                                      className="rounded-xl shadow-none"
                                    >
                                      <Image
                                        width={20}
                                        height={20}
                                        src="/icons/delete.png"
                                        alt="Delete"
                                      />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      href="#"
                                      noUnderline
                                      onClick={(e) => {
                                        e.preventDefault();
                                        highlightAndScrollToService(item.id);
                                      }}
                                    >
                                      <Image
                                        width={35}
                                        height={35}
                                        src="/icons/view.png"
                                        alt="see details"
                                        className="rounded-xl bg-button p-1"
                                      />
                                    </Link>
                                    <Link
                                      href={routes.backoffice.services.top.edit(
                                        item.id,
                                      )}
                                      noUnderline
                                    >
                                      <Image
                                        width={35}
                                        height={35}
                                        src="/icons/edit.png"
                                        alt="Edit"
                                        className="rounded-xl bg-button p-1"
                                      />
                                    </Link>

                                    <Button
                                      onClick={() => handleDelete(item.id)}
                                      className="rounded-xl shadow-none"
                                    >
                                      <Image
                                        width={20}
                                        height={20}
                                        src="/icons/delete.png"
                                        alt="Delete"
                                      />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={col.key}
                            className="border-x-2 border-gray-500"
                          >
                            <Text
                              color={textColor(col.key, item[col.key])}
                              className={cn(
                                isHighlighted && "text-black",
                                SERVICE_COLUMN_TYPES.NUMERIC_KEYS.includes(
                                  col,
                                ) && "font-bold",
                                "px-1",
                                !SERVICE_COLUMN_TYPES.LONG_TEXT_COLUMN.includes(
                                  col,
                                ) && "text-center",
                              )}
                            >
                              {tableName === "Top Services" &&
                              col.key === "service name"
                                ? item?.service?.name || "N/A"
                                : conditionalText(col.key, item[col.key])}
                            </Text>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <Text className="text-center">No {serviceType} found</Text>
          <Link href={createApiRoute}>Create a new {serviceType}</Link>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
