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
  users: {
    update: () => "/api/users",
    single: () => "/api/users",
  },
  services: {
    all: () => "/api/services",
    single: (id) => `/api/services?id=${id}`,
  },
};

export default apiRoutes;
