import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../../global/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private apiservice:ApiService) { }
  async getFaq(){
    return await this.apiservice.get(USER_ROUTES.GET_FAQS,true);
  }
}
