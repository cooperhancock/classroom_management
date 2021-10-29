/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient } from "@prisma/client";

const main = async () => {
    const prisma = new PrismaClient();

    await prisma.roomType.create({
        data: {
            roomTypeName: "General Purpose Classroom",
        },
    });

    for (const locationName of ["East Bank", "West Bank", "St. Paul"]) {
        await prisma.buildingLocation.create({
            data: {
                locationName,
            },
        });
    }

    await prisma.building.createMany({
        data: [
            {
                name: "Tate Hall",
                location: "East Bank",
            },
            {
                name: "Keller Hall",
                location: "East Bank",
            },
            {
                name: "Willey Hall",
                location: "West Bank",
            },
            {
                name: "Bruh moment hall",
                location: "St. Paul",
            },
        ],
    });

    const tateBuildingId = (await prisma.building.findFirst({
        where: {
            name: "Tate Hall",
        },
    }))!.id;
    const kellerBuildingId = (await prisma.building.findFirst({
        where: {
            name: "Keller Hall",
        },
    }))!.id;
    const willeyBuildingId = (await prisma.building.findFirst({
        where: {
            name: "Willey Hall",
        },
    }))!.id;
    const stPaulBuildingId = (await prisma.building.findFirst({
        where: {
            name: "Bruh moment hall",
        },
    }))!.id;

    await prisma.room.createMany({
        data: [
            {
                buildingId: kellerBuildingId,
                number: "3-230",
                capacity: 150,
                type: "General Purpose Classroom",
            },
            {
                buildingId: kellerBuildingId,
                number: "3-210",
                capacity: 150,
                type: "General Purpose Classroom",
            },
            {
                buildingId: kellerBuildingId,
                number: "3-115",
                capacity: 60,
                type: "General Purpose Classroom",
            },
            {
                buildingId: tateBuildingId,
                number: "B50",
                capacity: 300,
                type: "General Purpose Classroom",
            },
            {
                buildingId: tateBuildingId,
                number: "B20",
                capacity: 150,
                type: "General Purpose Classroom",
            },
            {
                buildingId: willeyBuildingId,
                number: "175",
                capacity: 400,
                type: "General Purpose Classroom",
            },
            {
                buildingId: willeyBuildingId,
                number: "125",
                capacity: 200,
                type: "General Purpose Classroom",
            },
            {
                buildingId: stPaulBuildingId,
                number: "420",
                capacity: 69,
                type: "General Purpose Classroom",
            },
        ],
    });
};

main();
