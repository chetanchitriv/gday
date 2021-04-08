import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module'
import { SettingComponent } from '../setting/setting.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent },
      {path:'setting', component:SettingComponent}
    ])
  ]
})
export class ProfileModule { }
