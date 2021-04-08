import { Component, OnInit } from '@angular/core';
import { AboutusService } from './aboutus.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutus:any
  constructor(private aboutusService:AboutusService) { }

  ngOnInit(): void {
    this.getAboutus()
  }
  async getAboutus(){
        
    const response:any = await this.aboutusService.getaboutus();
  
    if(response.msg=="Success"){
  
      this.aboutus=response.data;
  
  
      
      
    }
  }
  

}
