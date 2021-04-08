import { Router } from '@angular/router';
import { LocalStorageService } from './../local-storage.service';
import { NotificationAlertService } from './../notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandler {
  public mobileNotverified = new BehaviorSubject<any>(null);
  public emailNotverified = new BehaviorSubject<any>(null);
  constructor(
    private notificationService: NotificationAlertService,
    private ngxLoader: NgxUiLoaderService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  async handleError(serviceName, error: HttpErrorResponse) {
    const errorMessage = error.error.error || error.error.message;
    if (error.error.data && error.error.data.isMobileVerified === 0) {
      this.mobileNotverified.next(true);
      this.emailNotverified.next(false);
    } else if (error.error.data && error.error.data.isEmailVerified === 0) {
      if (error.error.data.isMobileVerified) {
        this.mobileNotverified.next(false);
        this.emailNotverified.next(true);
      }
    }
    if (errorMessage) {
      this.notificationService.showError(errorMessage);
    }
    this.ngxLoader.stop();
    switch (error.status) {
      case 400:
        return throwError(error);
      case 401:
        localStorage.clear();
        this.localStorageService.clearDataFromIndexedDB();
        this.router.navigate(['/']);
        return;
      case 403:
        this.router.navigate(['/home/dashboard']);
        return throwError(error);
      case 404:
        return throwError(error);
      case 500:
        return throwError(error);
      default:
    }

    return throwError(error);
  }
}
