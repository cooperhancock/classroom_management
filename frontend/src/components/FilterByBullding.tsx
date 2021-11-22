import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import React, { FC } from "react";
import { useBuildings } from "../api";

export interface FilterByBuildingProps {
    onChange?: (newBuildingId: string | null) => unknown;
    currentBuildingId?: string | null;
}

// TODO(rm): make this a dropdown -> value should be accessible by parent component
// TODO(rm): make this integrate with MUI
// TODO(rm): make this generic over all kinds of things to select as long as they have an id
export const FilterByBuilding: FC<FilterByBuildingProps> = ({
    onChange,
    currentBuildingId = null,
}) => {
    const buildings = useBuildings();

    switch (buildings.type) {
        case "LOADING":
            return <p>loading buildings</p>;
        case "READY":
            return (
                <>
                    <FormControl sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="buildingLabel">Building</InputLabel>
                        <Select
                            labelId="buildingLabel"
                            id="buildingSelect"
                            autoWidth
                            label="Building"
                            value={currentBuildingId ?? ""}
                            onChange={(event: SelectChangeEvent) => {
                                // TODO(rm): have a branded type for building ID maybe perhaps?
                                let selectedBuildingId: string | null =
                                    event.target.value;
                                if (selectedBuildingId === "") {
                                    selectedBuildingId = null;
                                }
                                onChange?.(selectedBuildingId);
                            }}
                        >
                            {buildings.value.map((building) => (
                                <MenuItem key={building.id} value={building.id}>
                                    {building.name}
                                    {() => console.log(building.id)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            );
    }
};
