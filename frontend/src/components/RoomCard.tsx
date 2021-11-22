import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface RoomCardProps {
    number: string;
    buildingName: string;
    imageUrl?: string;
}

export const RoomCard: FC<RoomCardProps> = ({
    buildingName,
    number,
    imageUrl,
}) => {
    return (
        <Button onClick={() => alert("you clicked on a room")}>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    width="140"
                    // TODO(rm) switch placeholder image
                    image={imageUrl ?? "https://placekitten.com/140/140"}
                ></CardMedia>
                <CardContent>
                    <Typography align="center">
                        {buildingName} {number}
                    </Typography>
                </CardContent>
            </Card>
        </Button>
    );
};
