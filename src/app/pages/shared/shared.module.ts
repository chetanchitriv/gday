import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import { VerifyEmailLinkComponent } from './component/verify-email-link/verify-email-link.component';
import { InputTrimModule } from 'ng2-trim-directive';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidationMessageComponent,
    VerifyEmailLinkComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTrimModule,
    TranslateModule,
    ModalModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ValidationMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTrimModule,
    VerifyEmailLinkComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
