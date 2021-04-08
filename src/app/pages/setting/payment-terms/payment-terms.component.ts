import { Component, OnInit } from '@angular/core';
import { PaymentTermsService } from './payment-terms.service';

@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit {

  payment_terms:any
  constructor(private paymentTermsService:PaymentTermsService) { }

  ngOnInit(): void {
    this.getPaymentTerms()
  }
  async getPaymentTerms(){
        
    const response:any = await this.paymentTermsService.getpaymentterms();
  
    if(response.msg=="Success"){
  
      this.payment_terms=response.data;

    }
  }

}
