import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private title = 'pwa-angular-starter';
  url_path;
  showHeader:boolean = false;
  path_array = ['/reset-password','/login','/register','/forgot-password', '/','/otp']
  constructor(public translate: TranslateService, private router:Router, private location:Location) {
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.urlChangeDetection();
  }
  urlChangeDetection(){
    
    this.router.events.subscribe((showHeader :any)=>{
      
      this.url_path = location.pathname;
     
      this.showHeader = this.path_array.includes(this.url_path);

    })
  }
}
