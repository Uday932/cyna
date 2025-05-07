const routes = {
  home: () => "/",
  backoffice: {
    home: () => "/backoffice",
    homepage: {
      home: () => "/backoffice/homepage",
      editCarousel: (id) => `/backoffice/homepage/${id}/editCarousel`,
    },
    dashboard: () => "/backoffice/dashboard",
    users: () => "/backoffice/users",
    services: {
      all: () => "/backoffice/services",
      single: (id) => `/backoffice/services/${id}`,
      create: () => "/backoffice/services/create",
      edit: (id) => `/backoffice/services/edit/${id}`,
      top: {
        create: () => "/backoffice/services/top/create",
        edit: (id) => `/backoffice/services/top/edit/${id}`,
      },
    },
    categories:{
      all: () => "/backoffice/categories",
      single: (id) => `/backoffice/categories/${id}`,
      create: () => "/backoffice/categories/create",
      edit: (id) => `/backoffice/categories/edit/${id}`,
    },
    categories:{
      all: () => "/backoffice/categories",
      single: (id) => `/backoffice/categories/${id}`,
      create: () => "/backoffice/categories/create",
      edit: (id) => `/backoffice/categories/edit/${id}`,
    },
    subscriptions: () => "/backoffice/subscriptions",
    settings: () => "/backoffice/settings",
  },
  services: {
    single: (id) => `/services/${id}`,
    all: () => "/services",
  },
  categories: {
    single: (id) => `/categories/${id}`,
    all: () => "/categories",
  },
  cart: () => "/cart",
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
  contact: () => "/contact",
};

export default routes;
