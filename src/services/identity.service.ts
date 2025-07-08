import { IdentityClient } from '@mmaesgi/identity-client';
import jwtAxios from '../lib/axios';

class IdentityService {
  private readonly client: IdentityClient;

  constructor() {
    this.client = new IdentityClient('http://localhost:5046', jwtAxios);
  }

    login(cancelToken?: any) {
      return this.client.login(cancelToken);
    }
  
    signup(cancelToken?: any) {
      return this.client.signup(cancelToken);
    }
  
    email(cancelToken?: any) {
      return this.client.email(cancelToken);
    }
  
    id(body?: any, cancelToken?: any) {
      return this.client.id(body, cancelToken);
    }
  
}

export const identityService = new IdentityService();
