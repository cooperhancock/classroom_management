import React, {
    CircularProgress,
    Container,
    Grid,
    Select,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useRooms, useBuildings, joinPending, Building } from "../api";
import { RoomCard, RoomCardProps } from "../components/RoomCard";
import { FilterByBuilding } from "../components/FilterByBullding";

export const Rooms: FC<{ building?: Building }> = ({ building }) => {
    const buildings = useBuildings();
    const rooms = useRooms(building?.id);
    const joined = joinPending(rooms, buildings);
    switch (joined.type) {
        case "LOADING":
            return <CircularProgress />;
        case "READY": {
            const buildingIdToBuilding: Map<string, Building> = new Map<
                string,
                Building
            >();
            for (const building of joined.value[1]) {
                buildingIdToBuilding.set(building.id, building);
            }
            return (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h2">Rooms</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FilterByBuilding></FilterByBuilding>
                        </Grid>
                        {joined.value[0].map((roomProps, i) => (
                            <Grid item xs={2} key={i}>
                                <RoomCard
                                    {...roomProps}
                                    buildingName={
                                        buildingIdToBuilding.get(
                                            roomProps.buildingId
                                        )?.name ?? "bruh moment"
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            );
        }
    }
};
