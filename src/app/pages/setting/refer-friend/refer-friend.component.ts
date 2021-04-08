import { Component, OnInit ,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { LOCAL_STORAGE_KEYS } from '../../global/constants';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import {ReferralService } from './referral.service'
import { ContactService } from '../../contact/contact.service';

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.scss']
})
export class ReferFriendComponent implements OnInit {
  modalRef: BsModalRef;
  refferal_Code: unknown;
  AllRefrralcode
  user: any;
  contacts:any;
  constructor( private modalService: BsModalService,private localStorage:LocalStorageService
      , private referal:ReferralService ,private contactservice:ContactService) { }

  ngOnInit(): void {
  this.getReferalCode();

  this.getCode();
   this.inviteFriend();
   this.getContacts();

  }


  async getReferalCode(){
     this.refferal_Code =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.IS_REFERAL_CODE);

  }

   async getCode(){

    const response:any = await this.referal.getReferralCode();
  
    if(response.code==200){
  
      this.AllRefrralcode=response.data;

    }
   }


   async inviteFriend(){
  

    const response:any = await this.referal. getInviteFriend();

    if(response.msg=="Success"){

      this.contacts=response.data;

      
      
    }

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async getContacts(){
 

    const response:any = await this.contactservice.getContact();

    if(response.msg=="Success"){

      this.contacts=response.data;

     
      
      
    }

  }
}
