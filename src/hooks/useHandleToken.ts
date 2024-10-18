import { useCallback } from "react";

export const useHandleToken = () => {
  const setToken = useCallback((token: string): void => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("authToken");
  }, []);

  return {
    setToken,
    getToken,
    removeToken,
  };
};
