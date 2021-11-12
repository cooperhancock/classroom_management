import { useCallback, useEffect, useState } from "react";
import { config } from "./config";

export interface Building {
    id: string;
    name: string;
    location: string;
}

export interface Room {
    id: string;
    buildingId: string;
    number: string;
    type: string;
    capacity: number;
}

export const getBuildingsFromApi: () => Promise<Building[]> = async () => {
    const response = await fetch(`${config.apiUrl}/buildings`);
    const json = await response.json();
    return json;
};

export const getRoomsFromApi: (buildingId?: string) => Promise<Room[]> = async (
    buildingId?: string
) => {
    const response =
        buildingId == undefined
            ? await fetch(`${config.apiUrl}/rooms`)
            : await fetch(`${config.apiUrl}/buildings/${buildingId}/rooms`);
    const json = await response.json();
    return json;
};

type Pending<T> = { type: "LOADING" } | { type: "READY"; value: T };

// TODO(rm): is there a better pattern for asyncronous AJAX calls in react?

/**
 * For some async function, call it once and make the result available when
 * possible
 * @param makePromise The async function in question
 * @returns `Pending<T>` -- either LOADING or READY with the value
 */
const usePromise = <T>(makePromise: () => Promise<T>): Pending<T> => {
    const [loadingState, setLoadingState] = useState<Pending<T>>({
        type: "LOADING",
    });
    useEffect(() => {
        makePromise().then((value) =>
            setLoadingState({ type: "READY", value: value })
        );
    }, [makePromise]);
    return loadingState;
};

export const useBuildings = (): Pending<Building[]> =>
    usePromise(getBuildingsFromApi);

export const useRooms = (buildingId?: string): Pending<Room[]> =>
    usePromise(useCallback(() => getRoomsFromApi(buildingId), [buildingId]));

export const joinPending = <T, U>(
    x: Pending<T>,
    y: Pending<U>
): Pending<[T, U]> => {
    switch (x.type) {
        case "LOADING":
            return { type: "LOADING" };
        case "READY":
            switch (y.type) {
                case "LOADING":
                    return { type: "LOADING" };
                case "READY":
                    return { type: "READY", value: [x.value, y.value] };
            }
    }
};
