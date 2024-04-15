import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarModel, EngineResponse, DriveMode } from "../models/car.model";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    // Query endpoint to fetch cars from the server
    getCars: builder.query<CarModel[], void>({
      query: () => "/garage",
    }),
    getCar: builder.query<CarModel, string>({
      query: (id) => `/garage/${id}`,
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
        url: `/garage/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteCar: builder.mutation<void, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: "DELETE",
      }),
    }),
    startStopEngine: builder.mutation<
      {
        id: number;
        status: "started" | "stopped";
      },
      EngineResponse
    >({
      query: ({ id, status }) => ({
        url: "/engine",
        method: "PATCH",
        params: { id, status },
      }),
    }),
    startDriveMode: builder.mutation<
      {
        id: number;
        status: "drive";
      },
      DriveMode
    >({
      query: ({ id, status }) => ({
        url: "/engine",
        method: "PATCH",
        params: { id, status },
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarQuery,
  useGenerateCarsMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useStartStopEngineMutation,
  useStartDriveModeMutation,
} = carsApi;
