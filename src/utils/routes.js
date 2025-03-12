const routes = {
  home: () => "/",
  categories: () => "/categories",
  products: () => "/products",
  cart: () => "/cart",
  checkout: () => "/checkout",
  contact: () => "/contact",
  account: () => "/my-account",
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
