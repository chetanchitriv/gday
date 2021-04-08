import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  messageList: any = {};

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

  ngOnInit(): void {

    this.intializingOtpForm();
    this.intializingMessage();
  }

  intializingOtpForm() {
    return this.taskForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }



  
  intializingMessage() {
    this.messageList.description= {
      required: this.translation.instant('ERR_MSG_DESCRIPTION_REQUIRED'),
    };
  }


    async onAdd(){
    this.formService.markFormGroupTouched(this.taskForm);

  }

}
