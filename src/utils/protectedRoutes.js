import apiRoutes from "@/apiUtils/apiRoutes.js";
import { ROLES } from "@/utils/constants.js";
import routes from "@/utils/routes.js";

const frontendProtectedRoutes = [
  {
    path: routes.account(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: "/backoffice",
    allowedRoles: [ROLES.ADMIN],
  },
];

const apiProtectedRoutes = [
  {
    path: apiRoutes.users.single(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: "/api/backoffice",
    allowedRoles: [ROLES.ADMIN],
  },
  {
    path: apiRoutes.signs.updatePassword(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: apiRoutes.address.all(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: apiRoutes.address.create(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: apiRoutes.address.delete(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: apiRoutes.address.upsert(),
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
];

const protectedRoutes = [...frontendProtectedRoutes, ...apiProtectedRoutes];

export default protectedRoutes;
