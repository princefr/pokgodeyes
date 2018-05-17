import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParkopolyService {

    isSignedIn = false;

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': environment.parkopoly.header.content_type,
      'X-App-Type': environment.parkopoly.header.x_app_type
    })
  };

  // noinspection TsLint
  private httpOptionsConnected: any;

  constructor(
      private http: HttpClient,
      private firebaseService: FirebaseService
  ) {}

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
    return this.http.post(this.getURI(environment.parkopoly.authenticate), body, this.httpOptions).subscribe(
        (res: any) => {
      // console.log(res.id_token);
        this.isSignedIn = true;
        this.httpOptionsConnected = {
          headers: new HttpHeaders(
            {
              'Content-Type': environment.parkopoly.header.content_type,
              'X-App-Type': environment.parkopoly.header.x_app_type,
              'Authorization': environment.parkopoly.header.authorization_prefix + res.id_token
          })
        }
      }
    );
  }


  /**
   * Get all concessions
   * @returns {Observable<ArrayBuffer>}
   */
  getAllConcessions(): Observable<ArrayBuffer> {
    return this.http.get(this.getURI(environment.parkopoly.concessions), this.httpOptionsConnected);
  }


  /**
   * Get all drivers
   * @returns {Observable<ArrayBuffer>}
   */
  getAllDrivers(): Observable<ArrayBuffer> {
    return this.http.get(this.getURI(environment.parkopoly.driver), this.httpOptionsConnected);
  }


}
