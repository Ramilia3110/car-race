import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarModel } from "../models/car.model";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    getCars: builder.query<CarModel[], void>({
      query: () => "/garage",
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
