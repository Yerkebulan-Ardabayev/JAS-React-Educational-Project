import { fetchProducts } from "../../fetchers/fetchProducts";
import { setError, setLoading, setProducts } from "../slice/shop";

export const loadProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const product = await fetchProducts();
    dispatch(setProducts(product));
  } catch (e) {
    console.error(e);
    dispatch(setError("Something is wrong"));
  }
  dispatch(setLoading(false));
};
