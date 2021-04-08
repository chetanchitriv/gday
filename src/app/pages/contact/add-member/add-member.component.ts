import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from '../../shared/services/form.service';
import { UtilityService } from '../../shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { RegexEnum } from '../../global/regex-enum';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { constants, LOCAL_STORAGE_KEYS } from '../../global/constants';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import {ContactService} from '../contact.service'
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {


  user: any;
  contacts:any;

  constructor( private contactservice:ContactService ,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
   
    private formBuilder: FormBuilder,
    public translation: TranslateService,
    private formService: FormService,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private router:Router,) { }

  ngOnInit(): void {

    this.getprofile();
  }



  async getprofile(){
    this.ngxLoader.start();

    const response:any = await this.contactservice.getContact();

    if(response.msg=="Success"){

      this.contacts=response.data;

      
      
    }

  }


}
