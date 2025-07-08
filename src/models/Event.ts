import type { EventStatus } from "./EventStatus";

export type Event = {
    id?: string;
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    isFavorite?: boolean;
}

export type EventRequest = {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    category?: string;
    status: EventStatus;
}