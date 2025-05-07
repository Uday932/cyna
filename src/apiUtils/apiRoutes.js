const apiRoutes = {
  address: {
    all: () => "/api/address",
    create: () => "/api/address",
    upsert: () => "/api/address",
    delete: (id) => `/api/address/${id}`,
  },
  signs: {
    signUp: () => "/api/signs/signUp",
    validate: () => "/api/signs/validateAccount",
    forgotPassword: {
      request: () => "/api/signs/forgot/request",
      reset: () => "/api/signs/forgot/reset",
    },
    updatePassword: () => "/api/signs/updatePassword",
    signIn: () => "/api/signs/signIn",
  },
  backoffice: {
    services: {
      create: () => "/api/backoffice/services",
      edit: (id) => `/api/backoffice/services/${id}`,
      delete: (id) => `/api/backoffice/services/${id}`,
      manageImages: (id) => `/api/backoffice/services/manageImages/${id}`,
      top: {
        create: () => "/api/backoffice/services/top",
        delete: (id) => `/api/backoffice/services/top/${id}`,
        update: (id) => `/api/backoffice/services/top/${id}`,
      },
    },
    categories: {
      create: () => "/api/backoffice/categories",
      edit: (id) => `/api/backoffice/categories/${id}`,
      delete: (id) => `/api/backoffice/categories/${id}`,
    },
    textSection: () => "/api/backoffice/text-section",
    carousel: (id) => `/api/backoffice/carousel/${id}`,
    createCarousel: () => "/api/backoffice/carousel",
  },

  textSection: () => "/api/text-section",
  carousel: {
    all: () => "/api/carousel",
    single: (id) => `/api/carousel?id=${id}`,
  },

  users: {
    update: () => "/api/users",
    single: () => "/api/users",
  },
  services: {
    all: () => "/api/services",
    single: (id) => `/api/services?id=${id}`,
    similar: (category) => `/api/services?category=${category}`,
    top: {
      all: () => "/api/services/top",
      single: (id) => `/api/services/top?id=${id}`,
    },
  },
  categories: {
    all: () => "/api/categories",
    single: (id) => `/api/categories?id=${id}`,
  },

  contact: () => "/api/contact",
};

export default apiRoutes;
