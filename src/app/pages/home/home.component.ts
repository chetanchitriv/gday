import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  url_path;
  showHeader:boolean = false;
  showSidebar:boolean=true;
  path_array = ['/home']
  constructor(private modalService: BsModalService,private activatedRoute:ActivatedRoute , private router:Router,) { 
    this.activatedRoute.url.subscribe(url =>{
 });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.urlChangeDetection();
  }

  urlChangeDetection(){
    this.router.events.subscribe((showHeader :any)=>{
      debugger
      this.url_path = location.pathname;
      this.showHeader = this.path_array.includes(this.url_path);
    })
  }
}
