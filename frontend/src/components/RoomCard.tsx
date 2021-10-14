import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { FC } from "react";

export interface RoomCardProps {
    name: string;
    imageUrl?: string;
}

export const RoomCard: FC<RoomCardProps> = ({ name, imageUrl }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                width="140"
                // TODO(rm) switch placeholder image
                image={imageUrl ?? "https://placekitten.com/140/140"}
            ></CardMedia>
            <CardContent>
                <Typography align="center">{name}</Typography>
            </CardContent>
        </Card>
    );
};
