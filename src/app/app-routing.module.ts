import { PrivacyPolicyComponent } from './pages/common/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './pages/common/terms-of-use/terms-of-use.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VerifyEmailLinkComponent } from './pages/shared/component/verify-email-link/verify-email-link.component';
import { ROUTE_PATHS } from './pages/global/constants';

const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATHS.LOGIN, pathMatch: 'full' },
  {
    path: ROUTE_PATHS.AUTH,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: ROUTE_PATHS.CHAT,
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: ROUTE_PATHS.CREATEEVENT,
    loadChildren: () => import('./pages/creat-event/creat-event.module').then(m => m.CreatEventModule)
  },
  {
    path: ROUTE_PATHS.MYEVENT,
    loadChildren: () => import('./pages/my-event/my-event.module').then(m => m.MyEventModule)
  },
  {
    path: ROUTE_PATHS.PROFILE,
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)  
  },
  {
    path: ROUTE_PATHS.SUBSCRIPTION,
    loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionModule)
  },
  {
    path: ROUTE_PATHS.CONTACT,
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: ROUTE_PATHS.SETTING,
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: ROUTE_PATHS.HOME,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // { path: ROUTE_PATHS.HOME, component: HomeComponent },
  // { path: ROUTE_PATHS.RESET_PASSWORD, component: ResetEmailPasswordComponent },
  // { path: ROUTE_PATHS.VERIFY_PASSWORD, component: VerifyEmailLinkComponent },
  { path: ROUTE_PATHS.PRIVACY_POLICY, component: PrivacyPolicyComponent },
  { path: ROUTE_PATHS.TERMS_AND_CONDITION, component: TermsOfUseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
