import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import{AboutUsComponent} from  './about-us/about-us.component';
 import {BlockedUserComponent} from './blocked-user/blocked-user.component';
 import {ChangePasswordComponent} from './change-password/change-password.component';
 import {ContactUsComponent} from './contact-us/contact-us.component';
 import {PushNotificationComponent} from './push-notification/push-notification.component';
 import {ReferFriendComponent} from './refer-friend/refer-friend.component';
 import {TermsConditionComponent} from './terms-condition/terms-condition.component';
 import {FaqsComponent} from './faqs/faqs.component';
 import { RouterModule, Routes } from '@angular/router';
 import { ROUTE_PATHS } from '../global/constants';
import { SettingComponent } from './setting.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';


const route:Routes = [
  { path: '', component:SettingComponent ,
  children:[
  { path: "", component: ChangePasswordComponent },
  { path: ROUTE_PATHS.CHANGE_PASSWORD, component: ChangePasswordComponent },
  { path: ROUTE_PATHS.BLOCKED_USER, component: BlockedUserComponent },
  { path: ROUTE_PATHS.ABOUT_US, component: AboutUsComponent },
  { path: ROUTE_PATHS.CONTACT_US, component: ContactUsComponent },
  { path: ROUTE_PATHS.PUSH_NOTIFICATION, component: PushNotificationComponent },
  { path: ROUTE_PATHS.FAQ, component: FaqsComponent },
  { path: ROUTE_PATHS.REFER_FRIEND, component: ReferFriendComponent },
  { path: ROUTE_PATHS.TERM_CONDITION, component: TermsConditionComponent },
  { path: ROUTE_PATHS.PAYMENT_TERMS, component: PaymentTermsComponent },
]

  },
]
@NgModule({
  declarations: [AboutUsComponent,
    BlockedUserComponent,
    ChangePasswordComponent,
    ContactUsComponent,
    PushNotificationComponent,
    ReferFriendComponent,
    TermsConditionComponent,
    FaqsComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    SharedModule,
    RouterModule.forChild(route),
  ],
 
  exports: [RouterModule],

})
export class SettingModule { }
