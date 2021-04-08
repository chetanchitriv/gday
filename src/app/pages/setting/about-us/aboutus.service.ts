import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { USER_ROUTES } from '../../global/constants';
@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  constructor(private apiservice:ApiService) { }
  async getaboutus(){
    return await this.apiservice.get(USER_ROUTES.GET_ABOUTUS,true);
  }
}
