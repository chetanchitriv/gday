import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EventSidebarComponent } from './event-sidebar/event-sidebar.component';

import { EditEventComponent } from '../contact/edit-event/edit-event.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MyeventComponent } from './myevent.component';

@NgModule({
  declarations: [MyeventComponent, EventSidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', component:MyeventComponent, 
     
    }
    ])
  ]
})
export class MyEventModule { }
