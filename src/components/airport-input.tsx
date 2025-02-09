import { Autocomplete, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import {
  SearchAirport,
  SearchAirportResponse,
} from "../types/flight-api.types.ts";

interface AirportInputProps {
  airport: string;
  setAirport: Dispatch<SetStateAction<string>>;
  airports: SearchAirportResponse | undefined;
  isLoading: boolean;
  label: string;
  setAirportDetails:  Dispatch<SetStateAction<SearchAirport | undefined | null>>;
}

export const AirportInput = ({
  airport,
  setAirport,
  airports,
  isLoading,
  label,
  setAirportDetails,
}: AirportInputProps) => {
  return (
    <Autocomplete
      filterOptions={(x) => x}
      sx={{ flex:1 }}
      onClose={() => setAirport("")}
      isOptionEqualToValue={(option, value) =>
        option.presentation.suggestionTitle ===
        value.presentation.suggestionTitle
      }
      getOptionLabel={(option) => option.presentation.suggestionTitle}
      options={airports ? airports.data : []}
      loading={isLoading}
      onChange={(_event: SyntheticEvent, newValue: SearchAirport | null) => {
        setAirportDetails(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          value={airport}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setAirport(event.target.value);
          }}
        />
      )}
    />
  );
};
