import { BrowserModule ,Meta } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { HomeComponent } from './pages/home/home.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PreventDoubleSubmitModule } from 'ngx-prevent-double-submission';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedModule } from './pages/shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CountdownModule } from 'ngx-countdown';
import { RouterModule } from '@angular/router';
import { NgxUiLoaderService, NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './pages/common/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './pages/common/terms-of-use/terms-of-use.component';

 

import {SettingModule} from './pages/setting/setting.module'
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'yellow',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 50,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.foldingCube, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 6, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    SettingModule,

        TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    PreventDoubleSubmitModule.forRoot(),
    ClickOutsideModule,
    SharedModule,
    RouterModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CountdownModule,
    NgOtpInputModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TranslateModule, SharedModule],
  providers: [BsModalRef ,Meta],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
