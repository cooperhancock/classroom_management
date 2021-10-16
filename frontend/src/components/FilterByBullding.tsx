import React, { FC } from "react";
import { useBuildings } from "../api";


// TODO(rm): make this a dropdown -> value should be accessible by parent component
// TODO(rm): make this integrate with MUI
// TODO(rm): make this generic over all kinds of things to select as long as they have an id
export const FilterByBuilding: FC = () => {
    const buildings = useBuildings();

    switch (buildings.type) {
        case "LOADING":
            return <p>loading buildings</p>;
        case "READY":
            return (
                <>
                    {buildings.value.map((building) => (
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
                    ))}
                </>
            );
    }
};
