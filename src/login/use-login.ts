import { useState } from "react";
import { LOGIN_SERVICE } from "./login-service";

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    LOGIN_SERVICE.checkLogin() != null
  );

  return {
    isLoggedIn,
    logIn: () => {
      LOGIN_SERVICE.login(undefined);
      setIsLoggedIn(true);
    },
    logOut: () => {
      LOGIN_SERVICE.logout();
      setIsLoggedIn(false);
    },
  };
};
