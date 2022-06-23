import axios from "axios";

export function fetchSingleProductItem(itemId) {
  return axios
    .get(
      `https://e-stroi.kz/api/catalog/client/item/${itemId}`
    )
    .then((res) => res.data);
}
