import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    loading: true,
    products: [],
    basketOpened: false,
    basket: JSON.parse(localStorage.getItem("basket")) ?? [],
    error: null
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setBasketOpened(state, action) {
      state.basketOpened = action.payload;
    },
    addToBasket(state, action) {
      const product = action.payload;
      const elem = state.basket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += 1;
      } else {
        state.basket.push({
          ...product,
          count: 1
        });
      }
    },
    changeBasketItemCount(state, action) {
      const { product, increment } = action.payload;
      const elem = state.basket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += increment;
      }
      state.basket = state.basket.filter((item) => item.count > 0);
    },
    removeItemFromBasket(state, action) {
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearBasket(state) {
      state.basket = [];
    }
  }
});

export const {
  setProducts,
  setBasketOpened,
  addToBasket,
  changeBasketItemCount,
  removeItemFromBasket,
  clearBasket,
  setLoading,
  setError
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
