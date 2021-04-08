import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { RegexEnum } from '../../global/regex-enum';
import { constants, LOCAL_STORAGE_KEYS, ROUTE_PATHS } from '../../global/constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private response: Subject<any>;
  forgotForm: FormGroup;
  messageList: any = {};
  showEmail;
  email = constants.EMAIL;
  mobileNumber = constants.MOBILE_NUMBER;
  type;

  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router
  ) { }

  ngOnInit() {
    this.response = new Subject();
    this.intializingForgotForm();
    this.intializingMessage();
  }

  intializingForgotForm() {
    return this.forgotForm = this.formBuilder.group({
      country_code: ['', [Validators.required,,Validators.pattern(RegexEnum.country_code)]],
      mobile: ['', [Validators.required,Validators.pattern(RegexEnum.mobile)]],
      type: [this.mobileNumber, Validators.required],
      phone: ['', []]
    });
  }

  intializingMessage() {
    this.messageList.mobile = {
      pattern: this.translation.instant('ERR_MSG_INVALID_MOBILE_NUMBER'),
      required: this.translation.instant('ERR_MSG_MOBILE_REQUIRED'),
    };

    this.messageList.country_code = {
      pattern: this.translation.instant('ERR_MSG_COUNTRY_CODE_INVALID'),
      required: this.translation.instant('ERR_MSG_REFERAL_CODE_REQUIRED'),
    };
  }

 

  async onForgotPassword() {  
    this.formService.markFormGroupTouched(this.forgotForm);
    let data = this.forgotForm.getRawValue();
    this.forgotForm.controls["mobile"].setValue(data.phone.number)
    this.forgotForm.controls["country_code"].setValue(data.phone.dialCode)
    if (this.forgotForm.valid) {
      this.ngxLoader.start();
      const data: any = this.forgotForm.getRawValue();
      //adding as cors error without response 
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, data.country_code);
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE,data.mobile);

      // 
      if (data.mobile) {
        const response: any = await this.authService.forgotPassword({ mobile: parseInt(data.mobile),country_code:data.country_code});
        if (response && response.data) {
          await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, data.country_code);
          await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE,data.mobile);

          // await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.ID, response.data.userId);
        this.router.navigate([ROUTE_PATHS.RESET_PASSWORD])
        }
      } else {
        const response: any = await this.authService.forgotPassword({ email: data.email });
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
}
