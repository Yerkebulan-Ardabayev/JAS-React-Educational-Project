import axios from "axios";
import { FIREBASE_API_KEY } from "../components/constants/index";

export function signUpUser({ email, password }) {
  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        returnSecureToken: true,
        email,
        password
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.data.error.message === "EMAIL_EXISTS") {
        throw new Error("Данный email уже используется!");
      }
      throw err;
    });
}
