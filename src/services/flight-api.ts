import { api } from "./api";
import {
  SearchAirportResponse, SearchFlightsParams,
  SearchFlightsResponse,
} from "../types/flight-api.types.ts";

export const fligthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchAirport: builder.query<SearchAirportResponse, string>({
      query: (searchTerm) => ({
        url: `/v1/flights/searchAirport?query=${searchTerm}&locale=en-US`,
      }),
    }),
    searchFlights: builder.query<SearchFlightsResponse, SearchFlightsParams>({
      query: (params) => ({
        url: `/v2/flights/searchFlights`,
        params: params,
      }),
    }),
  }),
});

export const { useSearchAirportQuery, useSearchFlightsQuery, useLazySearchFlightsQuery } = fligthApi;
