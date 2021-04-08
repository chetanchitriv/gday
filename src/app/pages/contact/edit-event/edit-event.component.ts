import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegexEnum } from '../../global/regex-enum';
import { LOCAL_STORAGE_KEYS } from '../../global/constants';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { FormService } from '../../shared/services/form.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { UtilityService } from '../../shared/services/utility.service';
import { EventService } from '../../shared/services/event/event.service';
  

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  EditEventForm: FormGroup;
  messageList: any = {};
  eventDetail:any;
  type:any;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:ActivatedRoute,
    private navigator:Router
  ) {
    router.params.subscribe(params => {
      this.getEventDetail(this.router.snapshot.params.id);
    })
  }


  ngOnInit(): void {
    this.intializingCreateEventForm();
    this.intializingMessage();
  }

  intializingCreateEventForm() {
   
    return this.EditEventForm = this.formBuilder.group({
      event_name: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.pattern(RegexEnum.name)]],
      type: ['', [Validators.required]],
    });
  }

  get createEventFormControls() { return this.EditEventForm.controls; }
 

  intializingMessage() {
    
    this.messageList.event_name = {
      pattern: this.translation.instant('Only Character allowed'),
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
  async getEventDetail(eventId:any){
    const response :any= await this.eventService.getEventDetail({"eventId":eventId} );
    if(response.msg=="Success"){
     this.eventDetail=response.data;
     this.EditEventForm.patchValue(this.eventDetail)
   }   
  }
  async onEditEvent() {
      this.formService.markFormGroupTouched(this.EditEventForm);
      if (this.EditEventForm.valid) { 
      this.ngxLoader.start();
      const sendData = await this.utilsService.cleanObject(this.EditEventForm.getRawValue());
      sendData["eventId"]=this.router.snapshot.params.id;
      sendData["eventId"]= await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.SELECTED_EVENT ,sendData.eventId);
      const response: any = await this.eventService.editEvent(sendData);
      if (response.code == 200) {
        this.navigator.navigate(["create-event/addmember"])
      }
    }
  }

}
