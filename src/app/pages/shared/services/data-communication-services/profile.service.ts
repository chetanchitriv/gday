import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private pinSubject = new Subject<any>();
  private kycSubject = new Subject<any>();
  private profileImage = new Subject<any>();
  private selectedEvent = new Subject<any>();

  setTransactionPin = pin => {
    this.pinSubject.next({ pin });
  }

  getTransactionPin = (): Observable<any> => {
    return this.pinSubject.asObservable();
  }

  setKycStatus = status => {
    this.kycSubject.next({ status });
  }

  getKycStatus = (): Observable<any> => {
    return this.kycSubject.asObservable();
  }

  setProfileImage = image => {
    this.profileImage.next({ image });
  }

  getProfileImage = (): Observable<any> => {
    return this.profileImage.asObservable();
  }

setselectedEvent = selectedEvent=>{
  this.selectedEvent.next({selectedEvent})
}

getselectedEvent= (): Observable<any> =>{
  return this.selectedEvent.asObservable();
}
}
