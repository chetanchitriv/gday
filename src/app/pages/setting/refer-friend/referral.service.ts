import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../../global/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  constructor(private apiservice:ApiService) { }


  async getReferralCode(){
    return await this.apiservice.get(USER_ROUTES.REFERRAL_CODE,true);
  }

  async getInviteFriend(){
    return await this.apiservice.get(USER_ROUTES.GET_CONTACT,true);
  }

}
