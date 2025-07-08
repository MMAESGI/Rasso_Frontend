import { RassoApiClient, EventResponseListApiResponse } from '@mmaesgi/rassoapi-client';
import jwtAxios from '../lib/axios';
import type { CancelToken } from 'axios';

class RassoApiService {
  private readonly client: RassoApiClient;

  constructor() {
    this.client = new RassoApiClient('http://localhost:5048', jwtAxios);
  }

  home(cancelToken?: CancelToken) {
    return this.client.home(cancelToken);
  }

  admin(cancelToken?: CancelToken) {
    return this.client.admin(cancelToken);
  }

  eventsGET(cancelToken?: CancelToken): Promise<EventResponseListApiResponse> {
    return this.client.eventsGET(cancelToken);
  }

  eventsPOST(body?: CancelToken, cancelToken?: CancelToken) {
    return this.client.eventsPOST(body, cancelToken);
  }

  eventsGET2(id: string, cancelToken?: CancelToken) {
    return this.client.eventsGET2(id, cancelToken);
  }

  eventsPUT(id: string, body?: CancelToken, cancelToken?: CancelToken) {
    return this.client.eventsPUT(id, body, cancelToken);
  }

  eventsPATCH(id: string, body?: CancelToken, cancelToken?: CancelToken) {
    return this.client.eventsPATCH(id, body, cancelToken);
  }

  eventsDELETE(id: string, cancelToken?: CancelToken) {
    return this.client.eventsDELETE(id, cancelToken);
  }

  top(cancelToken?: CancelToken) {
    return this.client.top(cancelToken);
  }

  location(locationName?: string, latitude?: number, longitude?: number, cancelToken?: CancelToken) {
    return this.client.location(locationName, latitude, longitude, cancelToken);
  }

  main(cancelToken?: CancelToken) {
    return this.client.main(cancelToken);
  }
}

export const rassoApiService = new RassoApiService();
