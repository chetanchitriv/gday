import { Component, OnInit } from '@angular/core';
import { TermsconditionService } from './termscondition.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  terms_condition:any
  constructor(private terrmsConditionService:TermsconditionService) { }

  ngOnInit(): void {
    this.getTermsCondition()
  }
  async getTermsCondition(){
        
    const response:any = await this.terrmsConditionService.gettermscondition();
  
    if(response.msg=="Success"){
  
      this.terms_condition=response.data;
  
  
      
      
    }
  }

}
