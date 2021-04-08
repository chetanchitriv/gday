import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateeventComponent } from './createevent.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EventSidebarComponent } from './event-sidebar/event-sidebar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from '../contact/edit-event/edit-event.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddMemberComponent } from './add-member/add-member.component';


import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [CreateeventComponent, EventSidebarComponent, AddEventComponent,AddMemberComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', component:CreateeventComponent  , 
      children:[
        {path:"", component:AddEventComponent},
        {path:"addmember", component:AddMemberComponent},
        { path: "editevent/:id", component: EditEventComponent },
      ]
    }
    ])
  ]
})
export class CreatEventModule { }
