import { LOCAL_STORAGE_KEYS, USER_ROUTES } from './../../../global/constants';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public skipKyc = new BehaviorSubject<any>(null);
  public updateKycStatus = new BehaviorSubject<any>(null);
  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) { }

  async getUserAuthenticate() {
    const userFound = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    return userFound;
  }

  async login(data) {
    return this.apiService.post(USER_ROUTES.SIGN_IN, data, false);
  }

  async signUp(data) {
    return await this.apiService.post(USER_ROUTES.SIGN_UP, data, false);
  }
  async forgotPassword(data) {
    return this.apiService.post(USER_ROUTES.FORGOT_PASSWORD, data, false);
  }

  async changePassword(data) {
    return this.apiService.post(USER_ROUTES.CHANGE_PASSWORD, data, true);
  }

  async resetPassword(data) {
    return this.apiService.post(USER_ROUTES.RESET_PASSWORD, data, false);
  }

  async verifyOtp(data) {
    return this.apiService.post(USER_ROUTES.VERIFY_OTP, data, false);
  }

  async requestOtp(data) {
    return this.apiService.post(USER_ROUTES.REQUEST_OTP, data, false);
  }

  async verifyPasswordLink(uniqueCode) {
    return this.apiService.get(`${USER_ROUTES.VERIFY_PASSWORD_LINK}${uniqueCode}`, false);
  }

  async verifyEmail(uniqueCode) {
    return this.apiService.get(`${USER_ROUTES.VERIFY_EMAIL}${uniqueCode}`, false);
  }

  async setTransactionPin(data) {
    return this.apiService.post(USER_ROUTES.SET_TRANSACTION_PIN, data, true);
  }

  async resendEmailVerifyLink(data) {
    return this.apiService.post(USER_ROUTES.RESEND_EMAIL_LINK, data, true);
  }

  async completeKyc(data) {
    return this.apiService.post(USER_ROUTES.KYC_SUBMIT, data, true);
  }

  async setWalletData(data) {
    return this.apiService.post(USER_ROUTES.SET_WALLET, data, true);
  }

  async setKYCDetails(data) {
    return this.apiService.post(USER_ROUTES.KEY_VERIFICATION, data, true);
  }
  async editProfile(data) {
    return await this.apiService.post(USER_ROUTES.EDIT_PROFILE, data, true);
  }
  
  
}
