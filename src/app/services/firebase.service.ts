import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class FirebaseService {
    user: Observable<firebase.User>;
    userId: string;
    token: string;

  constructor(private http: HttpClient, db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
    this.afAuth.authState.do(login => {
      if (login) {
          this.userId = login.uid;
      }
    }).subscribe();
  }





  public Login(token: string) {
   return this.afAuth.auth.signInWithCustomToken(token);
  }



  public getToken() {
    if (this.user) {
      return this.afAuth.auth.currentUser.getIdToken(false);
    } else {
      return null;
    }
  }


  public Geocoding(adresse: string) {
      const ApiKey = 'AIzaSyDZm9KLqKM2TY-R1g89pV85SuyGLhHZNoA';
      return this.http.post('https://maps.googleapis.com/maps/api/geocode/json?' + 'address=' + adresse + 'key='  + ApiKey , '').toPromise();
  }


  public LoginWithEmail(email: string, password: string){
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }








  public Logout(){
   return  this.afAuth.auth.signOut();
  }



}
