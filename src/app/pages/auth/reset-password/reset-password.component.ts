import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
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
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  confirmPasswordType = 'password';
  ConfirmPasswords= 'password';
  public resetPasswordForm: FormGroup;
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
    private router:Router
  ) { }

  async ngOnInit() {
    this.userId = await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.ID);
    this.response = new Subject();
    this.initializeResetPasswordForm();
    this.initializeMessages();
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = (this.confirmPasswordType === 'password') ? 'text' : 'password';
  }
   ConfirmPassword() {
    this.ConfirmPasswords= (this.ConfirmPasswords === 'password') ? 'text' : 'password';
  }

  onHide() {
    this.modalRef.hide();
  }

  initializeResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      otp: ['', [
        Validators.required]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern(RegexEnum.passwordValidation)]
      ],
      confirm_password: ['', [
        Validators.required]
      ],
    },
      { validator: UtilityService.MatchPassword }
    );
  }

  initializeMessages() {
    this.messageList.password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.confirm_password = {
      pattern: this.translation.instant('ERR_MSG_INVALID_CONFIRM_PASSWORD'),
      required: this.translation.instant('ERR_MSG_CONFIRM_PASSWORD_REQUIRED'),
    };
    this.messageList.otp = {
      required: this.translation.instant('ERR_MSG_OTP_REQUIRED'),
    };
  }

  get resetPasswordFormControls() { return this.resetPasswordForm.controls; }


  async onResetPassword() {  
    
    this.formService.markFormGroupTouched(this.resetPasswordForm);
    if (this.resetPasswordForm.valid) {
      this.ngxLoader.start();
      let data = this.resetPasswordForm.getRawValue();
      data["country_code"]=  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE);
      data["mobile"] =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
      data["mobile"] = parseInt(data["mobile"]);
      const response: any =  await this.authService.resetPassword(data);
        if (response && response.msg) {
         this.router.navigate([ROUTE_PATHS.AUTH]);
      }
    } else {
     
    }

    }
 
    
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

}
