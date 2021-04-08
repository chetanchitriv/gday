import { ProfileService } from './../../services/data-communication-services/profile.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../../../auth/login/login.component';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from '../../../global/constants';
import { AuthenticationService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  name = 'Angular';
  selectedTab = "Home";
  makeActive(tab: string) {
    this.selectedTab = tab;
  }
  isVerifiedUser = false;
  navbarOpen = false;
  user: any = { firstName: '', lastName: '', profilePicture: '' };
  subscription: Subscription;
  userImage: Blob;
  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private localStrorage: LocalStorageService,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  async ngOnInit() {
    this.getKycStatus();
    const kycStatus: any = await this.localStrorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.KYC_STATUS
    );
    this.isVerifiedUser = kycStatus;
    this.subscription = await this.profileService
      .getKycStatus()
      .subscribe(async response => {
        this.isVerifiedUser = response.status;
        if (this.isVerifiedUser) {
          await this.getUserProfile();
        }
      });
    this.subscription = await this.profileService
      .getProfileImage()
      .subscribe(async data => {
        this.userImage = await data.image;
        const reader = new FileReader();
        reader.onload = (anotherEvent: any) => {
          const url = anotherEvent.target.result;
          this.userImage = url;
        };
        reader.readAsDataURL(this.userImage);
      });
    if (this.isVerifiedUser) {
      await this.getUserProfile();
    }
  }

  login() {
    const initialState = {};
    const modalRef = this.modalService.show(LoginComponent, {
      initialState,
      class: 'modal-lg'
    });
    modalRef.content.response.subscribe(async (shouldYes: any) => {
      modalRef.content.hideConfirmationModal();
      if (!shouldYes) {
        return;
      }
      // Process yes
    });
  }

  onClose() {
    this.modalRef.hide();
  }

  getUserProfile = async () => {
    this.user.firstName = await this.localStrorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.FIRSTNAME
    );
    this.user.lastName = await this.localStrorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.LASTNAME
    );
    this.user.profilePicture = await this.localStrorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.PROFILE
    );
  }

  async getKycStatus() {
    this.subscription = this.authService.skipKyc.asObservable().subscribe((status: any) => {
      if (status) {
        this.isVerifiedUser = status;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
