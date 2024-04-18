import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
export default store;