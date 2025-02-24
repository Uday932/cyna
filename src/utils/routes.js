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
};

export default routes;
