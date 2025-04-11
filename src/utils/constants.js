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
    pageLink: routes.backoffice.homepage(),
  },
  dashboard: {
    title: "Tableau de bord",
    pageLink: routes.backoffice.dashboard(),
  },
  users: {
    title: "Utilisateurs",
    pageLink: routes.backoffice.users(),
  },
  services: {
    title: "Services",
    pageLink: routes.backoffice.services.all(),
  },
  subscriptions: {
    title: "Abonnements",
    pageLink: routes.backoffice.subscriptions(),
  },
  settings: {
    title: "Paramètres",
    pageLink: routes.backoffice.settings(),
  },
};

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};
