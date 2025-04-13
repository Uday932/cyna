"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import appConfig from "@/utils/appConfig.js";
import { ROLES } from "@/utils/constants.js";
import { isJwtExpired, verifyJwtToken } from "@/utils/utils.js";
import axios from "axios";
import {
  deleteCookie,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next/client";
import { createContext, useCallback, useEffect, useState } from "react";

const initialState = { session: null, user: { role: ROLES.USER } };

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);
  const [cartItems, setCartItems] = useState([]);

  const updateCartCookie = (cart) => {
    setCookie(appConfig.cart.cookieName, JSON.stringify(cart), {
      ...cookieOptions,
      maxAge: appConfig.cart.maxAge,
    });
  };

  useEffect(() => {
    const storedCart = getCookie(appConfig.cart.cookieName);

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const setSession = useCallback(async (jwt) => {
    if (!jwt) {
      deleteCookie(appConfig.security.session.cookieName);
      setState((prev) => ({
        ...prev,
        session: null,
        user: { role: ROLES.USER },
      }));

      return;
    }

    setCookie(appConfig.security.session.cookieName, jwt, {
      ...cookieOptions,
      maxAge: appConfig.security.session.maxAge,
    });

    try {
      const payload = await verifyJwtToken(jwt);

      setState((prev) => ({
        ...prev,
        session: { userId: payload.userId },
        user: { role: payload.role },
      }));
    } catch (error) {
      console.error("JWT parsing error:", error);
      setState((prev) => ({
        ...prev,
        session: null,
        user: { role: ROLES.USER },
      }));
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
    if (hasCookie(appConfig.security.session.cookieName)) {
      deleteCookie(appConfig.security.session.cookieName, cookieOptions);

      setState((state) => ({
        ...state,
        session: null,
        user: { role: ROLES.USER },
      }));

      return;
    }
  }, []);

  useEffect(() => {
    const jwt = getCookie(appConfig.security.session.cookieName);

    if (!jwt) {
      return;
    }

    if (isJwtExpired(jwt)) {
      deleteCookie(appConfig.security.session.cookieName);

      return;
    }

    if (state.session) {
      return;
    }

    setSession(jwt);
  }, [state.session, setSession]);

  const addToCart = useCallback((service, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];
      const itemIndex = updatedCart.findIndex((item) => item.id === service.id);

      if (itemIndex !== -1) {
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + quantity,
        };
      } else {
        updatedCart.push({ ...service, quantity });
      }

      updateCartCookie(updatedCart);

      return updatedCart;
    });
  }, []);

  return (
    <AppContext.Provider
      {...props}
      value={{ state, signIn, logOut, setSession, cartItems, addToCart }}
    />
  );
};

const AppContext = createContext();

export default AppContext;
