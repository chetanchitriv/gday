import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../shared/services/form.service';
import { UtilityService } from '../shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { RegexEnum } from '../global/regex-enum';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { constants, LOCAL_STORAGE_KEYS } from '../global/constants';
import { AuthenticationService } from '../shared/services/auth/auth.service';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
//import { ProfileService } from '../shared/services/data-communication-services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mediaEndPoint = environment.mediaEndPoint; // endpoint URL

  edditProfileForm: FormGroup;
  messageList: any = {};
  user: any;
  profile:any;
  inactive: boolean=true;


   // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File = null; // Variable to store file
  attachmentId: any;

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
   
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private ProfileService:ProfileService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.intializingUserForm();
    this.intializingMessage();
    this.getprofile();
  }
    async editable(){
    this.inactive = !(this.inactive);
  }

 // On file Select
 async onChange(event) {
   this.ngxLoader.start();

   const reader = new FileReader();
    
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     reader.readAsDataURL(file);
   
     reader.onload = () => {
    
       this.profile.profile_image = reader.result as string;
    
      
  
     };
  
   }
  this.file = event.target.files[0];
    const formData = new FormData(); 
   formData.append("image", this.file, this.file.name);
    const response:any=await this.ProfileService.upload(formData);
    if(response.msg=="Success"){

      this.attachmentId = response.data.attachmentId;


    }
    
}

  intializingUserForm() {
    return this.edditProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      mobile: ['', [Validators.required, Validators.pattern(RegexEnum.mobile)]],
     
      email: ['', [Validators.required, Validators.pattern(RegexEnum.email)]],
      referral_code:['',[]]
     
    
    });
  }

  intializingMessage() {
    this.messageList.fullName = {
      pattern: this.translation.instant('Only Character allowed'),
      required: this.translation.instant('Name required'),
    };

    this.messageList.email = {
      pattern: this.translation.instant('Invalid email'),
      required: this.translation.instant('Email required'),
    };
    this.messageList.mobile = {
      pattern: this.translation.instant('Invalid Phone Number'),
      required: this.translation.instant('Phone Number Required'),
    };

  }


  //service for get profile 

  async getprofile(){
    this.ngxLoader.start();

    const response:any = await this.ProfileService.getProfile();

    if(response.msg=="Success"){

      this.profile=response.data;
      this.profile.profile_image = this.mediaEndPoint+this.profile.profile_image

      this.edditProfileForm.patchValue(this.profile)
      
      
    }

  }
  

  async onSave() {
    this.formService.markFormGroupTouched(this.edditProfileForm);
    if (this.edditProfileForm.valid) {
      
      this.ngxLoader.start();
      const sendData = await this.utilsService.cleanObject(this.edditProfileForm.getRawValue());
      sendData["mobile"]=parseInt(sendData["mobile"]);
      sendData["country_code"] = this.edditProfileForm.value.country_code;
      sendData["filename"]= this.attachmentId;
      const response: any = await this.authService.editProfile(sendData);
      if (response.code == 200) {
        this.toastr.success(response.msg)
        this.router.navigate(['/home']);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE, sendData.mobile);
        await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.COUNTRY_CODE, this.edditProfileForm.value.country_code);
      }else{
        this.toastr.error(response.error)
      }
    }
  }

navigate(){
  
  this.router.navigate(['/setting/change-password']);
}


      
       
      

        
 

}
