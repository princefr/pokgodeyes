import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
// import * as Stripe from 'stripe';
// const stripe = new Stripe('sk_test_BQokikJOvBiI2HlWgH4olfQ2');
// declare var Stripe: any
// const stripe  = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');




@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent  {

    private sub: any;
    textValue = '';
    name  = '';
    phoneNumber = '';
    paymentInQuestion: Observable<{}>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  // ngOnInit() {
  //     this.route.params.subscribe(params => {
  //       // this.textValue = params['id'] + '€';
  //         // console.log(params['id']);
  //        this.paymentInQuestion =  this.db.object('Transactions/' + params['id']).valueChanges();
  //        console.log('this is the point');
  //         this.paymentInQuestion.subscribe(res => {
  //             console.log('this is my value of the fucking shit' + '' + JSON.stringify(res['amount']));
  //             this.textValue = res['amount'] + '€';
  //             this.name = res['firstname'] + ' ' + res['lastname'];
  //             this.phoneNumber = res['phonenumber'];
  //             }, err => {
  //           console.log(JSON.stringify(err));
  //         });
  //       // (+) converts string 'id' to a number
  //         // In a real app: dispatch action to load the details here.
  //
  //     });
  // }
  //
  //   setUpCard() {
  //       var elements = stripe.elements({
  //           fonts: [
  //               {
  //                   cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
  //               },
  //           ],
  //       });
  //
  //       var style = {
  //           base: {
  //               iconColor: '#c4f0ff',
  //               color: '#fff',
  //               fontWeight: 500,
  //               fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  //               fontSize: '16px',
  //               fontSmoothing: 'antialiased',
  //
  //               ':-webkit-autofill': {
  //                   color: '#fce883',
  //               },
  //               '::placeholder': {
  //                   color: '#87BBFD',
  //               },
  //           },
  //           invalid: {
  //               iconColor: '#FFC7EE',
  //               color: '#FFC7EE',
  //           },
  //       };
  //
  //       var card = elements.create('card', {style: style});
  //       card.mount('#example1-card');
  //      // this.registerElements([card], 'example1');
  //   }
  //
  //   ngAfterViewInit(): void {
  //       this.setUpCard();
  //   }
  //
  //
  //
  //
  //
  //   createToken(additionalData: object, element) {
  //     stripe.createToken(element, additionalData).then(function(results) {
  //
  //         if(results.token) {
  //           // faire le paiement
  //             // save to firebase
  //         }
  //     });
  //   }

















}
