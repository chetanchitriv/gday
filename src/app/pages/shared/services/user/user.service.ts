import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { USER_ROUTES } from '../../../global/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }

    editUserProfile = async (data) => {
      return await this.apiService.post(USER_ROUTES.PROFILE, data, true);
    }
   async updateSettings(data){
    return await this.apiService.post(USER_ROUTES.UPDATE_SETTINGS, data, true);
   }

   async contactUs(data){
    return await this.apiService.post(USER_ROUTES.CONTACT_US, data, true);
   }
}
