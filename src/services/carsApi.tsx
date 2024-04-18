import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CarModel,
  EngineResponse,
  DriveMode,
  Winner,
} from "../models/car.model";

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
    getWinners: builder.query<
      { id: number; wins: number; time: number }[], // Response data type
      void // No URL params
    >({
      query: () => "/winners",
    }),

    // New endpoint to get a specific winner
    getWinnerById: builder.query<
      { id: number; wins: number; time: number }, // Response data type
      number // URL params type
    >({
      query: (winnerId) => ({
        url: `/winners/${winnerId}`,
        method: "GET",
      }),
    }),
    createWinner: builder.mutation<Winner, Winner>({
      query: (winnerData) => ({
        url: "/winners",
        method: "POST",
        body: winnerData,
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
  useGetWinnersQuery,
  useGetWinnerByIdQuery,
  useCreateWinnerMutation,
} = carsApi;
