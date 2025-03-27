const routes = {
  home: () => "/",
  backoffice: {
    homepage: () => "/backoffice/homepage",
    dashboard: () => "/backoffice/dashboard",
    dashboardAnalytics: () => "/backoffice/dashboard/analytics",
    users: () => "/backoffice/users",
    services: () => "/backoffice/services",
    subscriptions: () => "/backoffice/subscriptions",
    settings: () => "/backoffice/settings",
  },
  categories: () => "/categories",
  services: {
    single: (id) => `/services/${id}`,
    all: () => "/services",
  },
  cart: () => "/cart",
  contact: () => "/contact",
  account: () => "/account",
  signs: {
    signUp: () => "/signs/signUp",
    signIn: () => "/signs/signIn",
    validate: (token) => `/signs/validate/${token}`,
    forgotPassword: {
      request: () => "/signs/forgot/request",
      reset: (resetToken) => `/signs/forgot/${resetToken}`,
    },
  },
  mentionLegalesCgu: () => "/mentions-legales-cgu",
};

export default routes;
