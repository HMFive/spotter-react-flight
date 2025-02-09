import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: {
      "x-rapid-ua": "RapidAPI-Playground",
      "x-rapidapi-key": import.meta.env.VITE_API_KEY,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  }),
  endpoints: () => ({}),
});
