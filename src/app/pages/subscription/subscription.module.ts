import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    SharedModule,
    BsDropdownModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
    RouterModule.forChild([
      { path: '', component: SubscriptionComponent }
    ])
  ],
  exports:[NgxStripeModule]
})
export class SubscriptionModule { }
