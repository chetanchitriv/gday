import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../global/constants';
import { ApiService } from '../shared/services/api.service';



@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private apiservice:ApiService
  ) { }

  async getAllSubscriptionList(){
    return await this.apiservice.get(USER_ROUTES.SUBSCRIPTION,false);
  }

  async getCardList(){
    return await this.apiservice.get(USER_ROUTES.CARD_LIST,true);
  }

  async postCard(data){
    return await this.apiservice.post(USER_ROUTES.CARD,data,true);
  }
  
  async PURCHASE(data){
    return await this.apiservice.post(USER_ROUTES.PURCHASE,data,true);
  }

  async skipSubscription(data){
    return await this.apiservice.post(USER_ROUTES.SKIPSUBSCRIPTION,data,true);
  }



}
