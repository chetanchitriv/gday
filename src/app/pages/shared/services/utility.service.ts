import { ApiService } from './api.service';
import { ProfileService } from './data-communication-services/profile.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { NotificationAlertService } from './notification.service';
import { constants, USER_ROUTES } from '../../global/constants';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private notificationService: NotificationAlertService,
    private apiService: ApiService
  ) { }

  public getQueryParams = new BehaviorSubject(null);
  public getCarouselData = new BehaviorSubject(null);

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirm_password = control.get('confirm_password').value;
    if (password !== confirm_password) {
      control.get('confirm_password').setErrors({ confirm_password: true });
    }
    else {
      return false;
    }
  }

  static OldMatchPassword(control: AbstractControl) {
    const password = control.get('old_password').value;
    const confirm_password = control.get('confirm_password').value;
    if (password == confirm_password) {
      control.get('confirm_password').setErrors({ confirm_password: true });
    }
    else {
      return false;
    }
  }
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  buildQuery(data) {
    if (typeof (data) === 'string') { return data; }
    const query = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && encodeURIComponent(data[key])) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }
    return query.join('&');
  }

  downloadFile(data, fileName) {
    const urlBlob = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  cleanObject(obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  }

  onLogout = async () => {
    await this.localStorage.clearStorage();
    await this.localStorage.clearDataFromIndexedDB();
    await this.profileService.setKycStatus(false);
    await this.router.navigate(['/']);
  }

  convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }


  async chooseImageEvent(chooseFile, route) {
    const file = chooseFile.target.files[0];
    let imagePath: string | ArrayBuffer = '';
    if (file) {
      if (file.size > constants.FILE_UPLOAD_SIZE_LIMIT) {
        return this.handleMaximumFileLimit();
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => imagePath = reader.result;
        const formdata = new FormData();
        formdata.append('image', file);
        (await this.apiService.uploadFileWithProgress(route, formdata)).subscribe((response: any) => {
          if (response && response.body && response.body.message) {
            this.notificationService.showSuccess(response.body.message);
          }
          if (response && response.body && response.body.error) {
            this.notificationService.showError(response.body.error);
          }
        });
      }
    }
  }

  async handleMaximumFileLimit() {
    this.notificationService.showError(await this.translate.get('FILE_MUST_BE_LESS_THAN_4_MB').toPromise());
  }
}
