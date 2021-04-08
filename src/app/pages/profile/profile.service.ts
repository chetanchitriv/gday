import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../global/constants';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private apiservice:ApiService) { }



// Returns an observable
  async upload(file) {
    return await this.apiservice.postFormDataReqWithToken(USER_ROUTES.UPLOAD_IMAGE, file )
}


  
  async getProfile(){
    return await this.apiservice.get(USER_ROUTES.GET_PROFILE,true);
  }
}
