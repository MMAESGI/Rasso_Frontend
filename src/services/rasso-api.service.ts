import { RassoApiClient} from '@mmaesgi/rassoapi-client';
import jwtAxios from '../lib/axios'; // ← ton axios avec intercepteur JWT

class RassoApiService {
  private client: RassoApiClient;

  constructor() {
    this.client = new RassoApiClient('http://localhost:5000', jwtAxios);
  }


  async test(): Promise<void> {
    //const response : DetailedEventResponseApiResponse = await this.client.eventsGET2("id")

  }


}

export const rassoApiService = new RassoApiService();
