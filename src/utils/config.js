import "dotenv/config.js";

const config = {
  security: {
    session: {
      maxAge: 60 * 60 * 24, // session valid for 24 hours
      cookieName: "cyna_app_session",
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: "1 day",
    },
    password: {
      saltLength: 16,
      hashLength: 64,
      minLenght: 8,
      minNbCapLetter: 1,
      minNbDigit: 1,
      minSpecialCar: 1,
    },
  },
  cart: {
    cookieName: "cyna_app_cart",
    maxAge: 60 * 60 * 24 * 7, // cart valid for 7 days
  },
};

export default config;
