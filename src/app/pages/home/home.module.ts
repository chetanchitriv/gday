import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LiveEventComponent } from './live-event/live-event.component';
import { Routes , RouterModule, } from '@angular/router';
import { HomeComponent}  from './home.component';
import { HomeHeaderComponent } from './home-header/home-header.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EventMediaComponent } from './event-media/event-media.component';
import { NoEventFoundComponent } from './no-event-found/no-event-found.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ROUTE_PATHS } from '../global/constants';
import { TaskComponent } from './task/task.component';
import { AssignedTaskListComponent } from './assigned-task-list/assigned-task-list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
const route:Routes = [
  { path:'', component:HomeComponent ,
  children:[
  { path: "", component:NoEventFoundComponent },
  // { path: "noevent", component:NoEventFoundComponent },
  { path: ROUTE_PATHS.LIVE_EVENTS, component:LiveEventComponent  },   
  { path: ROUTE_PATHS.MEDIA, component: EventMediaComponent },    
  {path : 'task', component: TaskComponent},
  {path:'task-list' ,component:AssignedTaskListComponent }
]

  },
]
@NgModule({
  declarations: [
    HomeComponent,
    LiveEventComponent,
    HomeHeaderComponent,
    EventMediaComponent,
    NoEventFoundComponent,
    TaskComponent,
    AssignedTaskListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    TabsModule.forRoot(),
    BsDropdownModule ,
   TooltipModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class HomeModule { }
