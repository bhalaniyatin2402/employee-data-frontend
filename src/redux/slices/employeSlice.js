import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    table: {
      name: "table 1",
      id: 1,
    },
    isInsertFile: false,
    employeeList: [],
    chartList: [],
  },
  reducers: {
    setisInsertFile(state, action) {
      state.isInsertFile = action.payload;
    },
    setTable(state, action) {
      state.table = action.payload;
    },
    setEmployeeList(state, action) {
      state.employeeList = action.payload;
    },
    setAddEmploye(state, action) {
      state.employeeList.push(action.payload);
    },
    setDeleteEmployee(state, action) {
      state.employeeList = state.employeeList.filter((employee) => {
        return !action.payload.includes(employee.id);
      });
    },
    setUpdateEmployee(state, action) {
      state.employeeList.map((emp, i) => {
        if (emp.id === action.payload.id) {
          state.employeeList[i] = action.payload;
        }
      });
    },
    setChartList(state, action) {
      state.chartList.push(action.payload);
    },
  },
});

export default employeeSlice.reducer;
export const {
  setEmployeeList,
  setisInsertFile,
  setTable,
  setAddEmploye,
  setDeleteEmployee,
  setUpdateEmployee,
  setChartList,
} = employeeSlice.actions;
