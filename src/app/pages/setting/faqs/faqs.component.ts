import { Component, OnInit } from '@angular/core';
import { FaqsService } from './faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  public isCollapsed = false;
  faqs:any;
  open: boolean = true;
  disabled: boolean = true;
  constructor(private faqsService:FaqsService) { }

  ngOnInit(): void {
   this.getFaqs()
  }

  log(isOpened: boolean){
    console.log(isOpened);
 }
 async getFaqs(){
        
  const response:any = await this.faqsService.getFaq();

  if(response.msg=="Success"){

    this.faqs=response.data;

  }

}


}
