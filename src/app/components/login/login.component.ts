import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {ParkopolyService} from '../../services/parkopoly.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers: [ParkopolyService]
})
export class LoginComponent implements OnInit {

    userRef: AngularFireObject<any>;
    mode = 'indeterminate';
    value = 50;
    hide = 'password'
    loading = '';

    constructor(private pkservice: ParkopolyService, private firebaseservice: FirebaseService, private router: Router, private db: AngularFireDatabase, public snackBar: MatSnackBar) {
        this.userRef = db.object('users');
    }

    ngOnInit() {

    }




    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }


    login(email: string, password: string) {
        this.loading = 'isLoading'
        this.firebaseservice.LoginWithEmail(email, password).then((res) => {
            this.loading = '';
            this.openSnackBar('La connexion a reussi', 'ok');
            this.router.navigate(['/home']);

        }).catch((err) => {
            this.loading = '';
            console.log(JSON.stringify(err))
            this.openSnackBar('La connexion a echoué, veuillez reesayer', 'ok');
        });
    }



}
