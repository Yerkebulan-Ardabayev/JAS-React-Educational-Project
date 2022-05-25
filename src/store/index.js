import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slice/counter";
import { shopReducer } from "./slice/shop";
import { todoReducer } from "./slice/todo";

const store = configureStore({
    reducer: { counter: counterReducer, shop: shopReducer, todo: todoReducer },
});

store.subscribe(() => {
    localStorage.setItem("basket", JSON.stringify(store.getState().shop.basket));
});

export default store;
