import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../global/constants';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor( private apiservice:ApiService) { }


  
  async getEditEvent(){
    return await this.apiservice.get(USER_ROUTES.GET_PROFILE,true);
  }

  async getContact(){
    return await this.apiservice.get(USER_ROUTES.GET_CONTACT,true);
  }


}
