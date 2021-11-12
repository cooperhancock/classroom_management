import React, {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useRooms, useBuildings, joinPending, Building } from "../api";
import { RoomCard } from "../components/RoomCard";
import { FilterByBuilding } from "../components/FilterByBullding";
import { useHistory, useLocation } from "react-router";

interface RoomFilterParams {
    buildingId?: string;
}

const useFilterQueryParams = (): RoomFilterParams => {
    const queryParams = new URLSearchParams(useLocation().search);
    return {
        buildingId: queryParams.get("buildingId") ?? undefined,
    };
};

export const Rooms: FC = () => {
    const history = useHistory();
    const location = useLocation();

    const { buildingId: selectedBuildingId } = useFilterQueryParams();
    console.log(
        `rerendering Rooms component with building id ${selectedBuildingId}`
    );
    const buildings = useBuildings();
    const rooms = useRooms(selectedBuildingId);
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
                            <FilterByBuilding
                                currentBuildingId={selectedBuildingId}
                                onChange={(newBuildingId: string | null) => {
                                    const queryParams: Record<string, string> =
                                        {};
                                    if (newBuildingId != null) {
                                        queryParams["buildingId"] =
                                            newBuildingId;
                                    }
                                    history.replace({
                                        pathname: location.pathname,
                                        search: new URLSearchParams(
                                            queryParams
                                        ).toString(),
                                    });
                                }}
                            ></FilterByBuilding>
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
