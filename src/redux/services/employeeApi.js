import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_API}api/v1`,
    credentials: "include",
  }),
  tagTypes: ["table"],
  endpoints: (builder) => ({
    getTableList: builder.query({
      query: () => `/table/list`,
    }),
    getEmployeeList: builder.mutation({
      query: (tableId) => ({
        url: `/table/?tableId=${tableId}`,
      }),
      invalidatesTags: ["table"],
    }),
    createTable: builder.mutation({
      query: (data) => ({
        url: `/table/`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTable: builder.mutation({
      query: (tableId) => ({
        url: `/table/?tableId=${tableId}`,
        method: "DELETE",
      }),
    }),
    addNewEmployee: builder.mutation({
      query: ({ tableId, data }) => ({
        url: `/employee/?tableId=${tableId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["table"],
    }),
    updateExistigEmployee: builder.mutation({
      query: ({ employeeId, data }) => ({
        url: `/employee/?employeeId=${employeeId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `/employee`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTableListQuery,
  useGetEmployeeListMutation,
  useCreateTableMutation,
  useDeleteTableMutation,
  useAddNewEmployeeMutation,
  useUpdateExistigEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
