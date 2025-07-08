import { rassoApiService } from '@/services/rasso-api.service';
import type { Event } from '@/models/Event';

export async function getEvents(): Promise<Event[]> {
    try {
        const response = await rassoApiService.eventsGET();
        const events: Event[] = [];
        if (response.data) {
            response.data.forEach(event => {
                events.push(event as Event);
            });
        }
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

export async function getEventById(id: string): Promise<Event | null> {
    try {
        const response = await rassoApiService.eventsGET2(id);
        let event: Event | null = null;
        if (response.data) {
            event = response.data as Event;
        }
        return event;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

export async function getTopEvents(): Promise<Event[]> {
    try {
        const response = await rassoApiService.top();
        const events: Event[] = [];
        if (response.data) {
            response.data.forEach(event => {
                events.push(event as Event);
            });
        }
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}