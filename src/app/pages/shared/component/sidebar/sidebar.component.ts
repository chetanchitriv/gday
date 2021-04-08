import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventService } from '../../services/event/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
selectedEventType:String="publicEvents";
Events:any=[]

mediaEndPoint = environment.mediaEndPoint; // endpoint URL

  constructor(private eventService:EventService,
    private ngxLoader: NgxUiLoaderService) { }


  async getPublicEventList(){
    this.ngxLoader.start();
    const response:any = await this.eventService.getPublicEvent();
    if(response.msg=="Success"){
      this.Events=response.data;
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



  

}
