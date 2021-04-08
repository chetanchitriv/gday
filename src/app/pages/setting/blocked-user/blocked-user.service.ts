import { Injectable } from '@angular/core';
import { USER_ROUTES } from '../../global/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedUserService {

  constructor(private apiservice:ApiService) { }

  async getBlockeduserList(){
    return await this.apiservice.get(USER_ROUTES.GET_BLOCKUSER_LIST,true);
  }

  async unblockuser(data){
    return await this.apiservice.post(USER_ROUTES.UNBLOCK_USER,data,true);
  }
}
