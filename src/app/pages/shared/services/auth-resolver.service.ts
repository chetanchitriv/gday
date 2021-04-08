import { LOCAL_STORAGE_KEYS } from './../../global/constants';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthResolverService implements Resolve<any> {
    constructor(private localstorageService: LocalStorageService, private router: Router) { }
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = await this.localstorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
        if (token) {
            return this.router.navigate(['home/dashboard']);
        }
    }
}
