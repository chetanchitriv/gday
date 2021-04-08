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

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;
  messageList: any = {};
  user: any;


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
    private router:Router
  ) { }

  ngOnInit() {

    this.intializingUserForm();
    this.intializingMessage();
  }

  intializingUserForm() {
    return this.addContactForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      mobile: ['', [Validators.required, Validators.pattern(RegexEnum.mobile)]],
      email: ['', [Validators.required, Validators.pattern(RegexEnum.email)]],
    });
  }


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
      pattern: this.translation.instant('ERR_MSG_INVALID_MOBILE_NUMBER'),
      required: this.translation.instant('ERR_MSG_MOBILE_REQUIRED'),
    };
  }


  async onSignUp() {
    
    this.formService.markFormGroupTouched(this.addContactForm);
    if (this.addContactForm.valid) {
      this.ngxLoader.start();
      const sendData = await this.utilsService.cleanObject(this.addContactForm.getRawValue());
      const response: any = await this.authService.signUp(sendData);
      if (response.message) {
        this.router.navigate(['/otp']);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
        const initialState = {};
        
      }
    }
  }

   



}
