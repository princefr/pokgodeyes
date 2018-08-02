import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FirebaseService} from './firebase.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/timer';

@Injectable()
export class ParkopolyService {

  isSignedIn = false;

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': environment.parkopoly.header.content_type,
      'X-App-Type': environment.parkopoly.header.x_app_type,
        'Authorization': environment.parkopoly.header.authorization_prefix + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmluY2Utc2NAcGFya29wb2x5LmZyIiwiYXV0aCI6IlJPTEVfVVNFUl9NQU5BR0VSLFJPTEVfVVNFUl9BRE1JTixST0xFX1VTRVIiLCJleHAiOjE1MzM5MTIxMDMsImlhdCI6MTUzMTMyMDEwM30.PrJX5Ypo041rTLc0R5DHgMjFOIrmTzEaZflkrMMdJM8_aZzvUHbm-C3YQA_K8hH5HRxU-e7tIypuH92p332kHg'
    })
  };

  // noinspection TsLint
  private httpOptionsConnected: any;

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  /**
   * Get the full URI to request the api
   * @param {string} suffix
   * @returns {string}
   */
  private getURI(suffix: string): string {
    return environment.parkopoly.domain + suffix;
  }

  /**
   * Get the token to request the api
   * @param {string} username
   * @param {string} password
   * @returns {Subscription}
   */
  login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
      rememberMe: true
    };

    return this.http.post(this.getURI(environment.parkopoly.authenticate), body, this.httpOptions);
  }


// .subscribe(
// (res: any) => {
//     // console.log(res.id_token);
//     this.isSignedIn = true;
//     this.httpOptionsConnected = {
//         headers: new HttpHeaders(
//             {
//                 'Content-Type': environment.parkopoly.header.content_type,
//                 'X-App-Type': environment.parkopoly.header.x_app_type,
//                 'Authorization': environment.parkopoly.header.authorization_prefix + res.id_token
//             })
//     };
// }
// )


  /**
   * Get all concessions
   * @returns {Observable<ArrayBuffer>}
   */
  getAllConcessions(): Observable<ArrayBuffer> {
    return this.http.get(this.getURI(environment.parkopoly.concessions), this.httpOptions);
  }




  /**
   * Get all drivers
   * @returns {Observable<ArrayBuffer>}
   */
  getAllDrivers(): Observable<ArrayBuffer> {
    return this.http.get(this.getURI(environment.parkopoly.driver), this.httpOptions);
  }


  connectWithParkopoly(username: string, password: string) {
    return this.http.post('https://us-central1-parkopoly-prod.cloudfunctions.net/LogWithParkopoly', {username: username, password: password});
  }



  sendPaymentSms() {
    return this.http.post('https://us-central1-parkopoly-prod.cloudfunctions.net/SendPaymentSsms', {lastname: 'prince', firstname: 'ondonda', phonenumber: '+33782798614', amount: 100});
  }



  //
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
  //     return this.authService.user.map(res => {
  //         if (res) {
  //             return true;
  //         } else {
  //             this.router.navigate(['/login']);
  //             return false;
  //         }
  //     }).first();
  // }


}
