import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventService } from '../../shared/services/event/event.service';

@Component({
  selector: 'app-contact-sidebar',
  templateUrl: './contact-sidebar.component.html',
  styleUrls: ['./contact-sidebar.component.scss']
})
export class ContactSidebarComponent implements OnInit {

  selectedEventType:String="publicEvents";
  
  Events:any=[]
  
    constructor(private eventService:EventService,
      private ngxLoader: NgxUiLoaderService,
      private router:Router) { }
  
  
    async getPublicEventList(){
      this.ngxLoader.start();
      const response:any = await this.eventService.getPublicEvent();
      if(response.msg=="Success"){
        this.Events=response.data;
        // this.selectedEventType=this.publicEvents;
      }
    }
    async getPrivateEventList(){
      this.ngxLoader.start();
      const response:any = await this.eventService.getPrivateEvent();
      if(response.msg=="Success"){
        this.Events=response.data;
      }
    }
    ngOnInit(): void {
      this.getPublicEventList();
      
     }
     selectEvent(data){

     }
  
}
