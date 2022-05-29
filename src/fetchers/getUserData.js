import axios from "axios";
import { FIREBASE_API_KEY } from "../components/constants/index";

export function getUserData(token) {
  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      { idToken: token }
    )
    .then((res) => res.data);
}
