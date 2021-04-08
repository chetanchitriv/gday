import { Component, OnInit  ,ViewChildren, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { RegexEnum } from '../../global/regex-enum';
import { constants, LOCAL_STORAGE_KEYS,ROUTE_PATHS } from '../../global/constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @ViewChildren('formRow') rows: any;
  private response: Subject<any>;
  otpForm: FormGroup;
  messageList: any = {};
  showEmail;
  email = constants.EMAIL;
  mobileNumber = constants.MOBILE_NUMBER;
  type;
  enableOTP: boolean;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  


  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.setTimer();
    this.response = new Subject();
    this.intializingOtpForm();
    this.intializingMessage();
  }

  setTimer(){
    this.enableOTP = false;
    setTimeout(() => {
      this.enableOTP = true;  
    }, 120000);
  }

  intializingOtpForm() {
    return this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
    });
  }

  intializingMessage() {
    this.messageList.otp = {
      required: this.translation.instant('ERR_MSG_OTP_REQUIRED'),
    };
  }


  async requestOTP(){
    let mobile =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
    let country_code =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE);
    if (mobile) {
      const response: any = await this.authService.requestOtp({ mobile:mobile ,country_code:country_code});
      if (response && response.code == 200) {
        this.toster.success(response.msg);
        this.setTimer();
      this.countdown.restart();

      }
    } 
  }


 
  async onOtp() {
    this.formService.markFormGroupTouched(this.otpForm);
    if (this.otpForm.valid) {
      this.ngxLoader.start();
      const data: any = this.otpForm.getRawValue();
      let mobile =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
      let country_code =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE);
      if (mobile && country_code) {
            const response: any = await this.authService.verifyOtp({ mobile: mobile,country_code:country_code,otp:parseInt(data.otp) });
        if (response && response.code==200) {
          debugger
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
          this.toster.success(response.msg);
          this.router.navigate(["/subscription"])
        }
      }
    }
  }
}
