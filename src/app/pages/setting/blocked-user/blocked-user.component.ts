import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from '../../shared/services/utility.service';
import { BlockedUserService } from './blocked-user.service';

@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.component.html',
  styleUrls: ['./blocked-user.component.scss']
})
export class BlockedUserComponent implements OnInit {
  blockusers:any
  constructor(private blockeduserlistService:BlockedUserService,
   private utilsService:UtilityService,
   private ngxLoader: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.getBlockedUser()
  }

  async unblock(userId:any){
    
    const response:any=await this.blockeduserlistService.unblockuser({"userId":userId} );
    
    if (response.msg == "Success") {
      this.getBlockedUser()
    }
    
  }
  async getBlockedUser(){
        
    this.ngxLoader.start();
    const response:any = await this.blockeduserlistService.getBlockeduserList();
  
    if(response.msg=="Success"){
  
      this.blockusers=response.data;
  
  
      
    
    }
  }
  

}
