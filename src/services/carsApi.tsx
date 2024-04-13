import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarModel } from "../models/car.model";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    // Query endpoint to fetch cars from the server
    getCars: builder.query<CarModel[], void>({
      query: () => "/garage",
    }),
    getCar: builder.query<CarModel, string>({
      query: (id) => `/garage/:${id}`,
    }),
    // Mutation endpoint to generate and post cars to the server
    generateCars: builder.mutation<{}, CarModel>({
      query: (car) => ({
        url: "/garage",
        method: "POST",
        body: car,
      }),
    }),
    updateCar: builder.mutation<CarModel, Partial<CarModel>>({
      // Change the return type to CarModel
      query: ({ id, ...rest }) => ({
        url: `/garage/:${id}`,
        method: "PUT", // Change method to PUT
        body: rest,
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarQuery,
  useGenerateCarsMutation,
  useUpdateCarMutation,
} = carsApi;
