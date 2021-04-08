import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventService } from '../../shared/services/event/event.service';
import { ProfileService } from '../../shared/services/data-communication-services/profile.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-myevent-sidebar',
  templateUrl: './event-sidebar.component.html',
  styleUrls: ['./event-sidebar.component.scss']
})
export class EventSidebarComponent implements OnInit {

  selectedEventType:string="upcomming";
  Events:any=[]
  mediaEndPoint = environment.mediaEndPoint; // endpoint URL

  
    constructor(private eventService:EventService,
      private ngxLoader: NgxUiLoaderService,
      private profileService:ProfileService) { }
  
      ngOnInit(): void {
        this.getUpcomingEventList();
        
       }
  
    async getUpcomingEventList(){
      this.ngxLoader.start();
      const response:any = await this.eventService.getUpcomingEvent();
      if(response.msg=="Success"){
        this.Events=response.data;
      
      }
    }
    async getCurrentEventList(){
      this.ngxLoader.start();
      const response:any = await this.eventService.getCurrentEvent();
      if(response.msg=="Success"){
        this.Events=response.data;
      }
    }
  
    async getPastEventList(){
      this.ngxLoader.start();
      const response:any = await this.eventService.getPastEvent();
      if(response.msg=="Success"){
        this.Events=response.data;
      }
    }
  
    selectedEvent(Event){
     this.profileService.setselectedEvent(Event);
    }
}
