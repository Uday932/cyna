"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import config from "@/utils/config.js";
import axios from "axios";
import {
  deleteCookie,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next/client";
import { createContext, useCallback, useEffect, useState } from "react";

const initialState = { session: null };

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setSession = useCallback((jwt) => {
    if (!jwt) {
      deleteCookie(config.security.session.cookieName);
      setState((prev) => ({ ...prev, session: null }));

      return;
    }

    setCookie(config.security.session.cookieName, jwt, {
      ...cookieOptions,
      maxAge: config.security.session.maxAge,
    });

    try {
      setState((prev) => ({
        ...prev,
        session: JSON.parse(atob(jwt.split(".")[1])),
      }));
    } catch (error) {
      console.error("JWT parsing error:", error);
      setState((prev) => ({ ...prev, session: null }));
    }
  }, []);

  const signIn = useCallback(
    async (email, password) => {
      const { data } = await axios.post(apiRoutes.signs.signIn(), {
        email,
        password,
      });

      setSession(data.jwt);
    },
    [setSession],
  );

  const logOut = useCallback(() => {
    if (hasCookie(config.security.session.cookieName)) {
      deleteCookie(config.security.session.cookieName, cookieOptions);

      setState((state) => ({
        ...state,
        session: null,
      }));

      return;
    }
  }, []);

  useEffect(() => {
    const jwt = getCookie(config.security.session.cookieName);

    if (jwt && !state.session) {
      setSession(jwt);
    }
  }, [state.session]);

  return (
    <AppContext.Provider
      {...props}
      value={{ state, signIn, logOut, setSession }}
    />
  );
};

const AppContext = createContext();

export default AppContext;
