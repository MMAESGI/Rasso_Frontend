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
    
    // Handle different response structures
    const eventData = response.data || response;
    
    if (eventData) {
      event = eventData as Event;
    }
    
    console.log('getEventById response:', event);
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

export async function getTopEvents(): Promise<Event[]> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/populaires`);
    const events: Event[] = [];
    if (response.data) {
      response.data.data.forEach((event: unknown) => {
        events.push(event as Event);
      });
    }
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEventsByUser(): Promise<Event> {
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
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/user_events`, config);

    return response.data
  } catch (error) {
    console.error('Login error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message ?? 'Failed to login')
    }
    throw error
  }
}


export async function createEvent(eventData: EventRequest | FormData): Promise<Event> {
    try {
    const token = localStorage.getItem('auth_token');
    const config = {
      headers: {} as Record<string, string>,
    };
    
    // Si c'est un FormData, ne pas définir Content-Type (axios le fait automatiquement)
    if (!(eventData instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/events`, eventData, config);

    return response.data
  } catch (error) {
    console.error('Create event error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message ?? 'Failed to create event')
    }
    throw error
  }
}

export async function getEventsByLocation(lat: number, lon: number): Promise<Event[]> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/location`, {
      params: { latitude: lat, longitude: lon },
    });
    const events: Event[] = [];
    if (response.data) {
      response.data.data.forEach((event: unknown) => {
        events.push(event as Event);
      });
    }
    return events;
  } catch (error) {
    console.error('Error fetching events by location:', error);
    throw error;
  }
}

export async function updateEvent(eventId: string, eventData: EventRequest | FormData): Promise<Event> {
  try {
    const token = localStorage.getItem('auth_token');
    const config = {
      headers: {} as Record<string, string>,
    };
    
    // Si c'est un FormData, ne pas définir Content-Type (axios le fait automatiquement)
    if (!(eventData instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/events/${eventId}`, eventData, config);

    return response.data
  } catch (error) {
    console.error('Update event error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message ?? 'Failed to update event')
    }
    throw error
  }
}