import "dotenv/config.js";

const config = {
  security: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: "1 day",
    },
    password: {
      saltLength: 16,
      hashLength: 64,
    },
  },
};

export default config;
