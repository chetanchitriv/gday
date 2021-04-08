import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
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
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  file: File = null; // Variable to store file

  private response: Subject<any>;
  userSignUpForm: FormGroup;
  messageList: any = {};
  agent = constants.ROLE.AGENT;
  user = constants.ROLE.USER;
  agentFormEnabled;
  categoriesData = constants.BUSINESS_CATEGORIES;
  confirmPasswordType = 'password';
  confirmPassword="password";
  profile_image: string;
  attachmentId: any;

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
    private imageService:ProfileService,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.response = new Subject();
    this.intializingUserForm();
    this.intializingMessage();
  }

  intializingUserForm() {
    return this.userSignUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      country_code: ['', [Validators.required,,Validators.pattern(RegexEnum.country_code)]],
      mobile: ['', [Validators.required,  Validators.maxLength(10), Validators.minLength(10), Validators.pattern(RegexEnum.mobile)]],
      role: [this.user, Validators.required],
      email: ['', [Validators.required, Validators.pattern(RegexEnum.email)]],
      password: ['', [Validators.required, Validators.pattern(RegexEnum.passwordValidation)]],
      confirm_password: ['', [Validators.required, Validators.pattern(RegexEnum.passwordValidation)]],
      referral_code:['',[]],
      phone: ['', []],
      image:['',[Validators.required]]

    },
     { validator: UtilityService.MatchPassword });
  }
  get userSignUpFormControls() { return this.userSignUpForm.controls; }
 

  toggleConfirmPasswordType() {
    this.confirmPasswordType = (this.confirmPasswordType === 'password') ? 'text' : 'password';
  }
  ConfirmPassword() {
    this.confirmPassword = (this.confirmPassword === 'password') ? 'text' : 'password';
  }

  intializingMessage() {
    this.messageList.fullName = {
      pattern: this.translation.instant('ERR_MSG_ONLY_CHARACTER_ALLOWED'),
      required: this.translation.instant('ERR_MSG_NAME_REQUIRED'),
    };
    this.messageList.image = {
      required: this.translation.instant('ERR_IMAGE_REQUIRED'),
    };
    this.messageList.email = {
      pattern: this.translation.instant('ERR_MSG_INVALID_EMAIL_ADDRESS'),
      required: this.translation.instant('ERR_MSG_EMAIL_REQUIRED'),
    };
    this.messageList.mobile = {
      pattern: this.translation.instant('ERR_MSG_INVALID_MOBILE_NUMBER'),
      required: this.translation.instant('ERR_MSG_MOBILE_REQUIRED'),
    };

    this.messageList.password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.confirm_password = {
      pattern: this.translation.instant('ERR_MSG_INVALID_CONFIRM_PASSWORD'),
      required: this.translation.instant('ERR_MSG_CONFIRM_PASSWORD_REQUIRED'),
    };

    this.messageList.referral_code = {
      pattern: this.translation.instant('ERR_MSG_REFERAL_CODE_INVALID'),
      required: this.translation.instant('ERR_MSG_REFERAL_CODE_REQUIRED'),
    };

    this.messageList.country_code = {
      pattern: this.translation.instant('ERR_MSG_COUNTRY_CODE_INVALID'),
      required: this.translation.instant('ERR_MSG_REFERAL_COUNTRY_REQUIRED'),
    };
  }

  async onSignUp() {
    this.formService.markFormGroupTouched(this.userSignUpForm);
    let data = this.userSignUpForm.getRawValue();
    this.userSignUpForm.controls["mobile"].setValue(data.phone.number)
    this.userSignUpForm.controls["country_code"].setValue(data.phone.dialCode)
    if (this.userSignUpForm.valid) {
      this.ngxLoader.start();
      const sendData = await this.utilsService.cleanObject(this.userSignUpForm.getRawValue());
      sendData["mobile"]=parseInt(sendData["mobile"]);
      sendData["country_code"] = this.userSignUpForm.value.country_code;
      sendData["profile_image"]=this.attachmentId;
      const response: any = await this.authService.signUp(sendData);
      if (response.code == 200) {
        this.requestOTP();
        this.router.navigate(['/otp']);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, this.userSignUpForm.value.country_code);
      }else{
        this.toster.error(response.error);
      }
    }
  }
  async requestOTP(){
    let mobile =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.MOBILE);
    let country_code =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE);
    if (mobile) {
      const response: any = await this.authService.requestOtp({ mobile:mobile ,country_code:country_code});
      if (response && response.code == 200) {
        this.toster.success(response.msg);
      }else{
      this.toster.error(response.error);
      }
    }
  }
  async onChange(event) {
    this.ngxLoader.start();
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profile_image = reader.result as string;
      };
    }
   this.file = event.target.files[0];
     const formData = new FormData(); 
    formData.append("image", this.file, this.file.name);
     const response:any=await this.imageService.upload(formData);
     if(response.code==200){
       this.attachmentId = response.data.attachmentId;
       this.toster.success(response.msg);
       this.userSignUpForm.controls['image'].setValue(this.profile_image);
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
  this.userSignUpForm.controls['mobile'].setValue(this.userSignUpForm.controls['phone'].value.number);
  this.userSignUpForm.controls['country_code'].setValue(this.userSignUpForm.controls['phone'].value.dialCode); 
 }
}
