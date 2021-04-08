import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ROUTE_PATHS } from '../global/constants';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { StoryComponent } from './story/story.component';
import { EventChatComponent } from './event-chat/event-chat.component';


const route:Routes = [
  { path:'', component:ChatComponent ,
  children:[
    { path: " ", component:EventChatComponent },
  { path: "event-chat", component:EventChatComponent },
  { path: "story", component:StoryComponent },

  
  
  
]

  },

]



@NgModule({
  declarations: [ChatComponent, ChatSidebarComponent, ChatHeaderComponent, StoryComponent, EventChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    BsDropdownModule ,
  ],
  exports: [RouterModule],
})
export class ChatModule { }
