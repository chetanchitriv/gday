import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { CountdownModule, CountdownConfig, CountdownGlobalConfig } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { ROUTE_PATHS } from '../global/constants';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

export function countdownConfigFactory(): CountdownConfig {
  return { format: `mm:ss` };
}
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    CountdownModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ModalModule,
    SharedModule,
    CountdownModule,
    NgOtpInputModule,
    ReactiveFormsModule ,
    NgxIntlTelInputModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: ROUTE_PATHS.SIGNUP, component: SignUpComponent },
      { path: ROUTE_PATHS.FORGOTPASSWORD, component: ForgotPasswordComponent },
      { path: ROUTE_PATHS.OTP, component: OtpComponent },
      { path: ROUTE_PATHS.RESET_PASSWORD, component: ResetPasswordComponent },

    ])
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
})
export class AuthModule { }
