import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FirebaseService} from './firebase.service';


@Injectable()
export class ParkopolyService {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-App-Type': 'prescriber'
    })
  };

  // noinspection TsLint
  httpOptionsConnected: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-App-Type': 'prescriber',
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb25kb25kYUBnbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSX01BTkFHRVIsUk9MRV9VU0VSX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUyODAzNzgxMiwiaWF0IjoxNTI1NDQ1ODEyfQ.WTBwSjDsn1hgEe48i52cR1B9g7NBc0m-jjq0nWGx4Dc8K7DElqF7hsoRuKuBa-lGmq-pMWJgqPFGIy-RHFs1Gg'
    })
  };

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }


  login(username: string, password: string) {
    return this.http.post('https://service.parkopoly.fr/api/users/authenticate', {
      username: username,
      password: password,
      rememberMe: true
    }, this.httpOptions).subscribe(res => {
      // console.log(res.id_token);

    });
  }


  getAllConcession() {
    return this.http.get('https://service.parkopoly.fr/api/backoffice/concessions/short', this.httpOptionsConnected);
  }


  getallDrivers() {
    return this.http.get('https://service.parkopoly.fr/api/backoffice/driver', this.httpOptionsConnected);
  }


}
