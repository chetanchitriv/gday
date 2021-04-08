import { Component, OnInit, ViewChild ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from './subscription.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ROUTE_PATHS, LOCAL_STORAGE_KEYS } from '../global/constants';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

import {

  StripeInstance,
  StripeFactoryService 
} from "ngx-stripe";




import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';




@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  stripe: StripeInstance;
  
  modalRef: BsModalRef;
  items: any[];
  showMainContent: Boolean = true;
  stripeTest: FormGroup;
    data:any;
    SubcriptionList:any;
    cardlist:any;
  modalOpened: boolean;
  selectedSubscription: any;
  constructor(private router:Router, private localStorage: LocalStorageService,private toster :ToastrService ,private subscriptionService:SubscriptionService,  private modalService: BsModalService,
    private fb: FormBuilder, private stripeService: StripeService,   private ngxLoader: NgxUiLoaderService, private stripeFactory: StripeFactoryService
    ) {
   }

   cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  
  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
 }

  async getSubcriptionList(){
    this.ngxLoader.start();
    const response:any = await this.subscriptionService.getAllSubscriptionList();
    if(response.msg=="Success"){
      this.SubcriptionList=response.data;
    }
  }
async getCardList(){
  const response:any=await this.subscriptionService.getCardList();
  if(response.code==200){
    debugger
    this.cardlist=response.data;
  }
}
  ngOnInit(): void {
    this.stripe = this.stripeFactory.create(environment.stripePublicKey);
   
    this.getSubcriptionList();
    this.getCardList();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

  }


  
  openModal(data) {
    this.selectedSubscription = data;
    this.modalOpened = true;
  }


  async subscription(cardId){
    this.ngxLoader.start();
    const response1:any = await this.subscriptionService.PURCHASE({"subscriptionId" : this.selectedSubscription.subscription_id, "cardId" :cardId.value, "amount" : this.selectedSubscription.amount});
          if(response1.code == 200){
            this.toster.success("Subscription Success")
            this.router.navigate([ROUTE_PATHS.HOME]);
          }else{
            this.toster.error("Subscription Failed")
          }
  
  }
  async createToken() {
    this.stripeService
    .createToken(this.card.getCard(), { name: this.stripeTest.value.name })
    .subscribe(async result => {
      if (result.token) {
        this.ngxLoader.start();
        const response:any = await this.subscriptionService.postCard({"token":result.token.id});
        if(response.code == 200){
          this.showMainContent =true;
          this.toster.success(response.msg);
          this.getCardList();
          }else{
          this.toster.error("Failed to Create Token")
        }
      } else if (result.error) {
      }
    });

  }
  async navigate(){
    this.ngxLoader.start();
    const response:any = await this.subscriptionService.skipSubscription({"":""});
    if(response.code == 200){
      await this.localStorage.setDataInIndexedDB(LOCAL_STORAGE_KEYS.SUBSCRIPTION, 1);
      this.router.navigate([ROUTE_PATHS.HOME]);
    }
  }

}
