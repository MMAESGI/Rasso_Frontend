import axios from 'axios';
import { rassoApiService } from '@/services/rasso-api.service';
import type { Event, EventRequest } from '@/models/Event';

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

export async function createEvent(eventData: EventRequest): Promise<Event> {
    try {
    const token = localStorage.getItem('auth_token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      } as Record<string, string>,
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/events`, eventData, config);

    return response.data
  } catch (error) {
    console.error('Login error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message ?? 'Failed to login')
    }
    throw error
  }
}