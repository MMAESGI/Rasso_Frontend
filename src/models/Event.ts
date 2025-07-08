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