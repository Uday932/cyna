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
    },
  },
};

export default config;
