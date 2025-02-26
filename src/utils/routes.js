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
    validate: (token) => `/signs/${token}`,
  },
  mentionLegaleCGU: () => "/mentions-legales-cgu",
};

export default routes;
