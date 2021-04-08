import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/data-communication-services/profile.service';
import { EventService } from '../../shared/services/event/event.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {

  Events:any=[]
  selectedEventType:string="chat";
 
  public show:boolean = false;
  public shows:boolean = false;
  constructor(private profileService:ProfileService ,private eventService:EventService) { }

  ngOnInit(): void {
    this.getUpcomingEventList();
  }
   
  toggle() {
    this.show = !this.show;
  }


  async getUpcomingEventList(){
   
    const response:any = await this.eventService.getUpcomingEvent();
    if(response.msg=="Success"){
      this.Events=response.data;
    
    }
  }
  async getCurrentEventList(){
  
    const response:any = await this.eventService.getCurrentEvent();
    if(response.msg=="Success"){
      this.Events=response.data;
    }
  }


  selectedEvent(Event){
    this.profileService.setselectedEvent(Event);
   }

}
