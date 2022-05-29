import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../fetchers/getUserData";

export const AuthorisedPage = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserData(token).then((data) => console.log(data));
  }, [token]);

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
};