import Box from "@mui/material/Box";
import {
  Button,
  Card,
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  useLazySearchFlightsQuery,
  useSearchAirportQuery,
} from "../services/flight-api.ts";
import { AirportInput } from "../components/airport-input.tsx";
import { SearchAirport } from "../types/flight-api.types.ts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AccountCircle,
  AirlineSeatReclineNormal,
  ArrowRightAlt,
  Search,
} from "@mui/icons-material";
import { Flights } from "../components/flights.tsx";

export const Home = () => {
  const [departureAirport, setDepartureAirport] = useState<string>("");

  const [destinationAirport, setDestinationAirport] = useState<string>("");

  const [departureAirportDetails, setDepartureAirportDetails] =
    useState<SearchAirport | null>();

  const [destinationAirportDetails, setDestinationAirportDetails] =
    useState<SearchAirport | null>();

  const [trigger, result] = useLazySearchFlightsQuery();

  const { data: departureAirports, isLoading: isLoadingDeparture } =
    useSearchAirportQuery(departureAirport, {
      skip: !departureAirport,
    });

  const { data: destinationAirports, isLoading: isLoadingDestination } =
    useSearchAirportQuery(destinationAirport, {
      skip: !destinationAirport,
    });

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  const [cabinClass, setCabinClass] = useState<
    "economy" | "premium_economy" | "business" | "first"
  >("economy");

  const [way, setWay] = useState("oneway");

  const handleChange = (event: SelectChangeEvent) => {
    setCabinClass(
      event.target.value as
        | "economy"
        | "premium_economy"
        | "business"
        | "first",
    );
  };

  const handleChangeWay = (event: SelectChangeEvent) => {
    setWay(event.target.value);
  };

  const handleSearch = async () => {
    if (departureAirportDetails && destinationAirportDetails && departureDate) {
      await trigger({
        originSkyId: departureAirportDetails.skyId,
        destinationSkyId: destinationAirportDetails.skyId,
        originEntityId: departureAirportDetails.entityId,
        destinationEntityId: destinationAirportDetails.entityId,
        date: departureDate.format("YYYY-MM-DD"),
        returnDate: returnDate?.format("YYYY-MM-DD"),
        cabinClass: cabinClass,
      }).unwrap();
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <img
          src={
            "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          }
        />
      </Box>
      <Container component="main" maxWidth="md">
        <Card elevation={5} sx={{ padding: 3, borderRadius: 3 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              sx={{
                "& fieldset": {
                  border: "none",
                },
              }}
              startAdornment={<ArrowRightAlt />}
              value={way}
              onChange={handleChangeWay}
            >
              <MenuItem value="oneway">One Way</MenuItem>
              <MenuItem value="roundtrip">Round Trip</MenuItem>
            </Select>
          </FormControl>
          <AccountCircle sx={{ color: "action.active", my: 1.5 }} />

          <TextField
            variant="standard"
            sx={{ width: "10%", m: 1 }}
            defaultValue={1}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              sx={{
                "& fieldset": {
                  border: "none",
                },
              }}
              startAdornment={<AirlineSeatReclineNormal />}
              value={cabinClass}
              onChange={handleChange}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium_economy">Premium Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <AirportInput
                airports={departureAirports}
                isLoading={isLoadingDeparture}
                setAirport={setDepartureAirport}
                airport={departureAirport}
                label="From"
                setAirportDetails={setDepartureAirportDetails}
              />
              <AirportInput
                airports={destinationAirports}
                isLoading={isLoadingDestination}
                setAirport={setDestinationAirport}
                airport={destinationAirport}
                label="To"
                setAirportDetails={setDestinationAirportDetails}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ flex: 1 }}
                  label="Departure Date"
                  value={departureDate}
                  onChange={setDepartureDate}
                />
                <DatePicker
                  sx={{ flex: 1, display: way === "oneway" ? "none" : "flex" }}
                  label="Return Date"
                  value={returnDate}
                  onChange={setReturnDate}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ margin: "0 auto" }}>
              <Button
                variant="contained"
                size={"large"}
                startIcon={<Search />}
                sx={{ borderRadius: 8 }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Card>
        {result && <Flights data={result?.data}></Flights>}
      </Container>
    </Box>
  );
};
