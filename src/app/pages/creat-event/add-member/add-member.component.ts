import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { UtilityService } from '../../shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { RegexEnum } from '../../global/regex-enum';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { constants, LOCAL_STORAGE_KEYS } from '../../global/constants';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { ProfileService } from '../../shared/services/data-communication-services/profile.service';
import { ContactService } from '../../contact/contact.service';
import { EventService } from '../../shared/services/event/event.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  searchText;
  user: any;
  contacts:any;
  selectedEvent:any;
  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private profileService:ProfileService,
    private contactservice:ContactService,
    private toster :ToastrService) { }

  ngOnInit(): void {
    this.getselectedEvent();
    this.getprofile();
  }

  getselectedEvent(){
  this.selectedEvent =  this.profileService.getselectedEvent();
   }

  async addMember(data){
    let selectedEvent =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.SELECTED_EVENT);
    const response:any = await this.eventService.addMember({ "eventId" : selectedEvent, "members" : [data.app_id]})
    if(response.code==200){
      this.toster.success(response.msg)
    } 
   }
 


   async getprofile(){
    this.ngxLoader.start();

    const response:any = await this.contactservice.getContact();

    if(response.msg=="Success"){

      this.contacts=response.data;

     
      
      
    }

  }

}
