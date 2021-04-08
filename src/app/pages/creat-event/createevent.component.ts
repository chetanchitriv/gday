import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegexEnum } from '../../pages/global/regex-enum';
import { LOCAL_STORAGE_KEYS } from '../global/constants';
import { AuthenticationService } from '../shared/services/auth/auth.service';
import { EventService } from '../shared/services/event/event.service';
import { FormService } from '../shared/services/form.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { UtilityService } from '../shared/services/utility.service';



@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.scss']
})

export class CreateeventComponent implements OnInit {
  showSidebar =true;
  constructor(){}

  ngOnInit(){
    
  }
  
}