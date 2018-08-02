
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import {ParkopolyService} from './parkopoly.service';
import {FirebaseService} from './firebase.service';

@Injectable()
export class ISConnectedService implements CanActivate {
    constructor(private router: Router, private pkservice: ParkopolyService, private fbservice:  FirebaseService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.fbservice.user.map(res => {
            if (res) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        }).first();
    }

}


