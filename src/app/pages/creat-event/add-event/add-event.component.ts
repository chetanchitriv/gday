import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegexEnum } from '../../global/regex-enum';
import { LOCAL_STORAGE_KEYS, ROUTE_PATHS } from '../../global/constants';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { EventService } from '../../shared/services/event/event.service';
import { FormService } from '../../shared/services/form.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ProfileService } from '../../shared/services/data-communication-services/profile.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  createEventForm: FormGroup;
  messageList: any = {};



   // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File = null; // Variable to store file
  attachmentId: any;
  imageSrc: string;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,
    private profileService:ProfileService,
    private toster:ToastrService,
  ) { }


  ngOnInit(): void {
    this.intializingCreateEventForm();
    this.intializingMessage();
  }

  intializingCreateEventForm() {
   
    return this.createEventForm = this.formBuilder.group({
      event_name: ['', [Validators.required, Validators.pattern(RegexEnum.title)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      image:['',[]]
    });
  }

  get createEventFormControls() { return this.createEventForm.controls; }
 

  intializingMessage() {
    
    this.messageList.event_name = {
      pattern: this.translation.instant('ERR_MSG_EVENT_TITLE_PATTERN'),
      required: this.translation.instant('ERR_MSG_EVENT_TITLE_REQUIRED'),
    };
    this.messageList.start_date = {
      required: this.translation.instant('Start Date required'),
    };
    this.messageList.end_date = {
      required: this.translation.instant('End Date Required'),
    };

    this.messageList.start_time = {
      required: this.translation.instant('Start Time required'),
    };
    
    this.messageList.end_time = {
      required: this.translation.instant('End Time required'),
    };

    this.messageList.description = {
      pattern: this.translation.instant('Invalid Description'),
      required: this.translation.instant('Description required'),
    };
    this.messageList.type = {
      required: this.translation.instant('Event type required'),
    };

  }


// On file Select
async onChange(event) {
  
 this.file = event.target.files[0];


 if (event.target.files[0].size < 10000000) {


  const reader = new FileReader();
    
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
   
     
 
    };
 
  }
// 
 const formData = new FormData(); 
 formData.append("image", this.file, this.file.name); 
 const response:any=await this.eventService.upload(formData);
 if(response.msg=="Success"){
   this.attachmentId = response.data.attachmentId;
 }
  }else{
    this.toster.error("Image size less 10MB required")
  }

   
}


  async onCreateEvent() {
      this.formService.markFormGroupTouched(this.createEventForm);
    let subscription =  await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.SUBSCRIPTION);
   
    if (this.createEventForm.valid) {

      if(subscription == 0){
        this.router.navigate([ROUTE_PATHS.SUBSCRIPTION]);
        return false;
      }
    this.ngxLoader.start();
    const sendData = await this.utilsService.cleanObject(this.createEventForm.getRawValue());
    sendData["image"] = this.attachmentId;
    const response: any = await this.eventService.addEvent(sendData);
    if (response.code == 200) {
      this.createEventForm.reset();
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.SELECTED_EVENT,response.data.eventId);
      this.imageSrc = null;
      this.toster.success(response.msg);
      this.router.navigate(["create-event/addmember"])
    }else{
      this.toster.error(response.error);
    }
    }
    // }else{
    //   this.router.navigate([ROUTE_PATHS.SUBSCRIPTION]);
    // }
  }

}
