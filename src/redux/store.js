import { configureStore } from "@reduxjs/toolkit";
// service reducer
import { employeeApi } from "./services/employeeApi";
// slice reducer
import employeSlice from "./slices/employeSlice";

const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    employee: employeSlice,
  },
  devTools: import.meta.env.VITE_APP_NODE_ENV === "development" ? true : false,
  middleware: (gDM) => gDM().concat(employeeApi.middleware),
});

export default store;
