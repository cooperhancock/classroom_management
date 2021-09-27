-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingLocation" (
    "locationName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RoomType" (
    "roomTypeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "startTimestamp" TIMESTAMP(3) NOT NULL,
    "endTimestamp" TIMESTAMP(3) NOT NULL,
    "reservationOwnerId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuildingLocation_locationName_key" ON "BuildingLocation"("locationName");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_roomTypeName_key" ON "RoomType"("roomTypeName");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_type_fkey" FOREIGN KEY ("type") REFERENCES "RoomType"("roomTypeName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_location_fkey" FOREIGN KEY ("location") REFERENCES "BuildingLocation"("locationName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservationOwnerId_fkey" FOREIGN KEY ("reservationOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
