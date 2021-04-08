import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ROUTE_PATHS } from '../global/constants';
import { ContactSidebarComponent } from './contact-sidebar/contact-sidebar.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [ContactComponent, ContactSidebarComponent, EditEventComponent,AddMemberComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component:ContactComponent  , 
      children:[
        { path: "", component: AddMemberComponent },
        { path: "edit/:id", component: EditEventComponent },
      ]
    }
      ]),
      BsDropdownModule.forRoot(),
      PopoverModule.forRoot()
    
  ]
})
export class ContactModule { }
