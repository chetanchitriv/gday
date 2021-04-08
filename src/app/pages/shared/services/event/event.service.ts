import { Injectable } from '@angular/core';
import { USER_ROUTES } from 'src/app/pages/global/constants';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService:ApiService) { }
  async getPublicEvent(){
    return await this.apiService.get(USER_ROUTES.GET_PUBLIC_EVENT,true);
  }
  async getPrivateEvent(){
    return await this.apiService.get(USER_ROUTES.GET_PRIVATE_EVENT,true);
  }
  async getUpcomingEvent(){
    return await this.apiService.get(USER_ROUTES.GET_UPCOMING_EVENT,true);
  }
  async getCurrentEvent(){
    return await this.apiService.get(USER_ROUTES.GET_CURRENT_EVENT,true);
  }
  async getPastEvent(){
    return await this.apiService.get(USER_ROUTES.GET_PAST_EVENT,true);
  }
  async addEvent(data) {
    return await this.apiService.post(USER_ROUTES.ADD_EVENT, data, true);
  }
  async editEvent(data) {
    return await this.apiService.post(USER_ROUTES.EDIT_EVENT, data, true);
  }
  async getEventDetail(data){
    return await this.apiService.post(USER_ROUTES.EVENT_DETAIL,data,true);
  }

  // Returns an observable
  async upload(file) {
    return await this.apiService.postFormDataReqWithToken(USER_ROUTES.UPLOAD_IMAGE, file )
}


async deletEvent(id){
  return await this.apiService.delete(USER_ROUTES.DELET_EVENT,id)
}

async addMember(data){
  return await this.apiService.post(USER_ROUTES.ADD_MEMBER,data,true);
}
}
