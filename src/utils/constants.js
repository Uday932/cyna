import routes from "@/utils/routes.js";

export const availabilityStatus = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  MAINTENANCE: "MAINTENANCE",
};

export const backofficePageTitles = {
  home: {
    title: "Back-Office",
    pageLink: routes.backoffice.home(),
  },
  homepage: {
    title: "Homepage",
    pageLink: routes.backoffice.homepage.home(),
  },
  dashboard: {
    title: "Dashboard",
    pageLink: routes.backoffice.dashboard(),
  },
  users: {
    title: "Users",
    pageLink: routes.backoffice.users(),
  },
  services: {
    title: "Services",
    pageLink: routes.backoffice.services.all(),
  },
  subscriptions: {
    title: "Subscriptions",
    pageLink: routes.backoffice.subscriptions(),
  },
  settings: {
    title: "Settings",
    pageLink: routes.backoffice.settings(),
  },
};

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const CURRENCY_SYMBOL = "€";

export const AVAILABILITY_STATUS = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  MAINTENANCE: "MAINTENANCE",
};

export const SERVICE_COLUMN_TYPES = {
  PRICE_KEYS: ["monthlyPrice", "annualPrice", "perUserPrice", "perDevicePrice"],
  NUMERIC_KEYS: ["maxResources", "usedResources", "priority"],
  LONG_TEXT_COLUMN: [
    "summary",
    "description",
    "technicalCharacteristics",
    "companyBenefits",
  ],
  DATE_KEYS: ["updatedAt", "createdAt"],
  IGNORED_COLUMNS: ["images"],
};

export const SORT_DIRECTION = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC",
};
