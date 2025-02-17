const routes = {
  home: () => "/",
  signs: {
    signUp: () => "/signs/signUp",
    validate: (token) => `/signs/${token}`,
  },
};

export default routes;
