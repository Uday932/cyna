const routes = {
  home: () => "/",
  backoffice: () => "/backoffice",
  categories: () => "/categories",
  products: () => "/products",
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
