import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../shared/services/form.service';
import { TranslateService } from '@ngx-translate/core';
import { RegexEnum } from '../../global/regex-enum';
import { UtilityService } from '../../shared/services/utility.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS ,ROUTE_PATHS} from '../../global/constants';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  confirmPasswordType = 'password';
  newPasswords='password';
  confirmPassword ='password';
  public changePasswordForm: FormGroup; 
  private response: Subject<any>;
  public messageList: any = {};
  private userId;
  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private formService: FormService,
    public translation: TranslateService,
    private localStorage: LocalStorageService,
    private authService: AuthenticationService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private utilsService: UtilityService,
    private toster:ToastrService
  ) { }


  async ngOnInit() {
    this.userId = await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.ID);
    this.response = new Subject();
    this.initializeChangePasswordForm();
    this.initializeMessages();
  }


  onHide() {
    this.modalRef.hide();
  }


  initializeChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [
        Validators.required,
        Validators.pattern(RegexEnum.passwordValidation)]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern(RegexEnum.passwordValidation)]
      ],
      confirm_password: ['', [
        Validators.required]
      ],
    },
      [{ validator: UtilityService.MatchPassword }],

      
    );
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = (this.confirmPasswordType === 'password') ? 'text' : 'password';
  }
  newPassword(){
    this.newPasswords= (this.newPasswords === 'password') ? 'text' : 'password';
  }
  confirmPasswords(){
    this. confirmPassword= (this. confirmPassword === 'password') ? 'text' : 'password';
  }
  
  initializeMessages() {
    this.messageList.password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.old_password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.confirm_password = {
      required: this.translation.instant('ERR_PASSWORD_REQUIRED'),
    };
  }

  get ChangePasswordFormControls() { return this.changePasswordForm.controls; }

  async onChangePassword() {
    this.formService.markFormGroupTouched(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      const data = await this.utilsService.cleanObject(this.changePasswordForm.getRawValue());
      if(data["old_password"] == data["password"]){
        this.toster.error("Old password and new password must be different")
return false;
      }
      this.ngxLoader.start();
     
      data["country_code"]=  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE);
      data["mobile"] =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
      data["mobile"] = parseInt(data["mobile"]);
      
      const response: any =  await this.authService.changePassword(data);
      if (response.message == "Success") {
        this.router.navigate(["/home"]);
         await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, data.mobile);
        //  await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
         await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, this.changePasswordForm.value.country_code);
         //  await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
       }
      else {
        response.msg == "you are unauthorized"
      }

    }
  }

}
