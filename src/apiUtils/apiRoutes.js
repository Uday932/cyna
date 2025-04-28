const apiRoutes = {
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
  },
  

  contact: () => "/api/contact",
};

export default apiRoutes;
