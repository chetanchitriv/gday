import { ProfileService } from './../../shared/services/data-communication-services/profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegexEnum } from '../../global/regex-enum';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS, constants, KYC_STATUS, ROUTE_PATHS } from '../../global/constants';
import { HttpErrorHandler } from '../../shared/services/error-handler/http-error-handler.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private response: Subject<any>;
  loginForm: FormGroup;
  messageList: any = {};
  agent = constants.ROLE.AGENT;
  confirmPasswordType = 'password';  
  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private profileService: ProfileService,
    private errorHandler: HttpErrorHandler,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private toster:ToastrService

  ) { }

  ngOnInit() {
    this.response = new Subject();
    this.intializingUserForm();
    this.intializingMessage();
  }
  toggleConfirmPasswordType() {
    this.confirmPasswordType = (this.confirmPasswordType === 'password') ? 'text' : 'password';
  }

  intializingUserForm() {
    return this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required,Validators.pattern(RegexEnum.mobile)]],
      country_code: ['', [Validators.required,Validators.pattern(RegexEnum.country_code)]],
      password: ['', Validators.required],
      phone: ['', []]

    });
  }

  intializingMessage() {
    this.messageList.mobile = {
      pattern: this.translation.instant('ERR_MSG_INVALID_MOBILE_NUMBER'),
      required: this.translation.instant('ERR_MSG_MOBILE_REQUIRED'),
    };

    this.messageList.password = {
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
  }

 

  async onLogin() {
    this.formService.markFormGroupTouched(this.loginForm);
    let data = this.loginForm.getRawValue();
    this.loginForm.controls["mobile"].setValue(data.phone.number)
    this.loginForm.controls["country_code"].setValue(data.phone.dialCode)
     data = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      data["mobile"] = parseInt(data.mobile);
      delete data["phone"];
      this.ngxLoader.start();
      const response: any = await this.authService.login(data);
      if (response && response.code == 200) {
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.TOKEN,response.data.token);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.FULLNAME, response.data.fullName);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.IS_REFERAL_CODE, response.data.referral_code);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, response.data.email);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, response.data.country_code);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, response.data.mobile);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.EMAIL, response.data.email);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.IS_VERIFIED, response.data.is_verified);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.PROFILE_IMAGE, response.data.profile_image);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.SUBSCRIPTION, response.data.subscription);
        this.router.navigate([ROUTE_PATHS.HOME])
    }else{
      this.toster.error(response.error);
    }
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
  ValidateMobile(){
    this.loginForm.controls['mobile'].setValue(this.loginForm.controls['phone'].value.number);
    this.loginForm.controls['country_code'].setValue(this.loginForm.controls['phone'].value.dialCode); 
   }
}
