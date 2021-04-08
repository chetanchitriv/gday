import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LOCAL_STORAGE_KEYS } from '../global/constants';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { UserService } from '../shared/services/user/user.service';
import { UtilityService } from '../shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  toggle = true;
  notification_status = 0;
  constructor(private userService:UserService,

    private localStorage: LocalStorageService,
    private utilsService: UtilityService,
    private ngxLoader: NgxUiLoaderService,
    private toster:ToastrService
    ) { }
 
  ngOnInit(): void {
  }

   async change(e){
  
    
    this.ngxLoader.start();
    if(e.target.checked){
       this.notification_status =1;
    }else{
       this.notification_status =0;
    }

   
   const response: any = await this.userService.updateSettings({ "notification_status" : this.notification_status});
    if (response.code == 200) {
      this.notification_status=response.data;
      this.toster.success(response.msg);
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.MOBILE,response.mobile);
    
      const initialState = {};
  
    }
 
  }
}
