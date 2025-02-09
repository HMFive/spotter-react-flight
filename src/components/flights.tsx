import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {SearchFlightsResponse} from "../types/flight-api.types.ts";

export const Flights= ({data}: {data?: SearchFlightsResponse }) => {

    return (
        <>
            {data?.data?.itineraries.map((i) => {
                const durationInMinutes = i.legs[0].durationInMinutes;
                const hours = Math.floor(durationInMinutes / 60);
                const minutes = durationInMinutes % 60;

                return (
                    <Card sx={{ marginTop: 2, padding: 3, borderRadius: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                src={i.legs[0].carriers.marketing[0].logoUrl}
                                width={40}
                                height={40}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6">
                                    {new Date(i.legs[0].departure).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    {" - "}
                                    {new Date(i.legs[0].arrival).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>
                                <Typography color="textSecondary">
                                    {i.legs[0].carriers.marketing[0].name}
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: "center" }}>
                                <Typography>
                                    {hours} hrs {minutes} min
                                </Typography>
                                <Typography>
                                    {i.legs[0].origin.id} - {i.legs[0].destination.id}
                                </Typography>
                            </Box>

                            <Typography>{i.legs[0].stopCount} Stop</Typography>

                            <Typography variant="h6" color="primary">
                                {i.price.formatted}
                            </Typography>
                        </Box>
                    </Card>
                );
            })}
        </>
    )
}