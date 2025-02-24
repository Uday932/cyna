"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import config from "@/utils/config.js";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { createContext, useCallback, useEffect, useState } from "react";

const initialState = { session: null };

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setSession = useCallback((jwt) => {
    if (!jwt) {
      deleteCookie(config.security.session.cookieName);
      setState((prev) => ({ ...prev, session: null }));

      return;
    }

    setCookie(config.security.session.cookieName, jwt, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: config.security.session.maxAge,
      path: "/",
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

  const logOut = useCallback(async (jwt) => {
    if (jwt) {
      deleteCookie(config.security.session.cookieName);

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
  }, [state.session]); // 🔥 Ne pas mettre `setSession` ici

  return <AppContext.Provider {...props} value={{ state, signIn, logOut }} />;
};

const AppContext = createContext();

export default AppContext;
