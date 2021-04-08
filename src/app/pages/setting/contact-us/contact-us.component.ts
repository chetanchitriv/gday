import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { UtilityService } from '../../shared/services/utility.service';
import { RegexEnum } from '../../global/regex-enum';
import { constants, LOCAL_STORAGE_KEYS } from '../../global/constants';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  private response: Subject<any>;
  ContactForm: FormGroup;
  messageList: any = {};
  agent = constants.ROLE.AGENT;
  user = constants.ROLE.USER;
  agentFormEnabled;
  categoriesData = constants.BUSINESS_CATEGORIES;
  profile: any;
  data: any;


  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private ProfileService:ProfileService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.response = new Subject();
    this.intializingUserForm();
    this.intializingMessage();
    this.getprofile();
  }
  async getprofile(){
        
    const response:any = await this.ProfileService.getProfile();

    if(response.msg=="Success"){

      this.profile=response.data;

      this.ContactForm.patchValue(this.profile)
      
      
    }              

  }
  intializingUserForm() {
    return this.ContactForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      
      mobile: ['', [Validators.required, Validators.pattern(RegexEnum.mobile)]],
      
      email: ['', [Validators.required, Validators.pattern(RegexEnum.email)]],
      description: ['', [Validators.required]],
      title:['', [Validators.required]]
      
    });
  }

  get resetPasswordFormControls() { return this.ContactForm.controls; }

  intializingMessage() {
    this.messageList.fullName = {
      pattern: this.translation.instant('ERR_MSG_ONLY_CHARACTER_ALLOWED'),
      required: this.translation.instant('ERR_MSG_NAME_REQUIRED'),
    };
    this.messageList.email = {
      pattern: this.translation.instant('ERR_MSG_INVALID_EMAIL_ADDRESS'),
      required: this.translation.instant('ERR_MSG_EMAIL_REQUIRED'),
    };
    this.messageList.mobile = {
      pattern: this.translation.instant('ERR_MSG_INVALID_CONTACT_NUMBER'),
      required: this.translation.instant('ERR_MSG_CONTACT_REQUIRED'),
    };
    this.messageList.description = {
      required: this.translation.instant('ERR_MSG_TEXT_REQUIRED'),
    };
    this.messageList.title = {
      required: this.translation.instant('ERR_MSG_TITLE_REQUIRED'),
    };

  }


  onHide() {
    this.modalRef.hide();
  }


  async onSubmit() {
    this.ngxLoader.start();
    this.formService.markFormGroupTouched(this.ContactForm);
    if (this.ContactForm.valid) {
        this.ngxLoader.start();
        const sendData = await this.utilsService.cleanObject(this.ContactForm.getRawValue());
         sendData["mobile"]=parseInt(sendData["mobile"]);
         sendData["country_code"] = this.ContactForm.value.country_code;
         const response: any = await this.userService.contactUs(sendData);
        if (response.msg == "Success") {
          this.data=response.data
         await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
  
      }
    }
  }

}
