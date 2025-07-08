import { RassoApiClient, EventResponseListApiResponse } from '@mmaesgi/rassoapi-client';
import jwtAxios from '../lib/axios';

class RassoApiService {
  private readonly client: RassoApiClient;

  constructor() {
    this.client = new RassoApiClient('http://localhost:5048', jwtAxios);
  }

  home(cancelToken?: any) {
    return this.client.home(cancelToken);
  }

  admin(cancelToken?: any) {
    return this.client.admin(cancelToken);
  }

  eventsGET(cancelToken?: any): Promise<EventResponseListApiResponse> {
    return this.client.eventsGET(cancelToken);
  }

  eventsPOST(body?: any, cancelToken?: any) {
    return this.client.eventsPOST(body, cancelToken);
  }

  eventsGET2(id: string, cancelToken?: any) {
    return this.client.eventsGET2(id, cancelToken);
  }

  eventsPUT(id: string, body?: any, cancelToken?: any) {
    return this.client.eventsPUT(id, body, cancelToken);
  }

  eventsPATCH(id: string, body?: any, cancelToken?: any) {
    return this.client.eventsPATCH(id, body, cancelToken);
  }

  eventsDELETE(id: string, cancelToken?: any) {
    return this.client.eventsDELETE(id, cancelToken);
  }

  top(cancelToken?: any) {
    return this.client.top(cancelToken);
  }

  location(locationName?: string, latitude?: number, longitude?: number, cancelToken?: any) {
    return this.client.location(locationName, latitude, longitude, cancelToken);
  }

  main(cancelToken?: any) {
    return this.client.main(cancelToken);
  }
}

export const rassoApiService = new RassoApiService();
