const routes = {
  home: () => "/",
  signs: {
    signUp: () => "/signs/signUp",
    signIn: () => "/signs/signIn",
    validate: (token) => `/signs/validate/${token}`,
    forgotPassword: {
      request: () => "/signs/forgot/request",
      reset: (resetToken) => `/signs/forgot/${resetToken}`,
    },
  },
};

export default routes;
