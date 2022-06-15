import axios from "axios";

export function fetchCatalogItem(categoryId) {
  return axios
    .get(
      `http://e-stroi.kz:8082/catalog/client/item?categoryId=${categoryId}&lang=ru`
    )
    .then((res) => res.data);
}
 