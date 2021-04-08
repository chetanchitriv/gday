import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../../global/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TermsconditionService {

  constructor(private apiservice:ApiService) { }
  async gettermscondition(){
    return await this.apiservice.get(USER_ROUTES.GET_TERMS_CONDITION,true);
  }
}
