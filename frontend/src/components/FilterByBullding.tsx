import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useBuildings } from "../api";

// TODO(rm): make this a dropdown -> value should be accessible by parent component
// TODO(rm): make this integrate with MUI
// TODO(rm): make this generic over all kinds of things to select as long as they have an id
export const FilterByBuilding: FC = () => {
    const buildings = useBuildings();
    const testList = ["hi", "i", "am", "a", "test"];
    const [currentBuildingId, setCurrentBuildingId] = useState("");

    switch (buildings.type) {
        case "LOADING":
            return <p>loading buildings</p>;
        case "READY":
            return (
                <>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="buildingLabel">Building</InputLabel>
                        <Select
                            labelId="buildingLabel"
                            id="buildingSelect"
                            autoWidth
                            label="Building"
                            value={currentBuildingId}
                            onChange={(event: SelectChangeEvent) =>
                                setCurrentBuildingId(
                                    event.target.value ?? "bruh"
                                )
                            }
                        >
                            {buildings.value.map((building) => (
                                <MenuItem key={building.id} value={building.id}>
                                    {building.name}
                                    {() => console.log(building.id)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* {buildings.value.map((building) => (
                        <div key={building.id}>
                            <p>
                                <b>Building name: {building.name}</b>
                            </p>
                            <p>
                                <b>Building location: {building.location}</b>
                            </p>
                            <p>
                                <b>Building id: {building.id}</b>
                            </p>
                        </div>
                    ))} */}
                </>
            );
    }
};
