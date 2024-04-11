import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarModel } from "../models/car.model";

// Function to generate a random color

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    // Query endpoint to fetch cars from the server
    getCars: builder.query<CarModel[], void>({
      query: () => "/garage",
    }),
    // Mutation endpoint to generate and post cars to the server
    generateCars: builder.mutation<{}, CarModel>({
      query: (car) => ({
        url: "/garage",
        method: "POST",
        body: car,
      }),
    }),
  }),
});

export const { useGetCarsQuery, useGenerateCarsMutation } = carsApi;
