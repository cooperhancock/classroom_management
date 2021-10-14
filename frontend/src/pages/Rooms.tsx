import React, { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { RoomCard, RoomCardProps } from "../components/RoomCard";

const fakeRooms: RoomCardProps[] = [
    { name: "Bruininks 512" },
    { name: "Bruininks 412" },
    { name: "Bruininks 312" },
    { name: "Bruininks 212" },
];

export const Rooms: FC = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">Rooms</Typography>
                </Grid>
                <Grid item xs={12}>
                    todo: filters
                </Grid>
                {fakeRooms.map((roomProps, i) => (
                    <Grid item xs={2} key={i}>
                        <RoomCard {...roomProps} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
