import {
    Component,
    AfterViewInit,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {NgForm} from '@angular/forms';
declare var Stripe: any;
const stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const elements = stripe.elements();

@Component({
  selector: 'app-create-transaction',
  templateUrl: './Transactions.component.html',
  styleUrls: ['./Transactions.component.css']
})
export class TransactionComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('cardInfo') cardInfo: ElementRef;
    @ViewChild('SubmitButton') SubmitButton: ElementRef;
    @ViewChild('myDiv') myDiv: ElementRef;
    @ViewChild('loader') loader: ElementRef;
    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.loader.nativeElement.style.display = 'none';
      this.myDiv.nativeElement.style.display = 'block';
    }

    ngOnDestroy(): void {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }


    onChange({ error }) {
        if (error) {
            this.error = error.message;
        } else {
            this.error = null;
        }
        this.cd.detectChanges();
    }

    ngAfterViewInit(): void {
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
    }


    async onSubmit(form: NgForm) {
        const { token, error } = await stripe.createToken(this.card);
        this.SubmitButton.nativeElement.setAttribute('disabled', 'disabled');
        if (error) {
            console.log('Something is wrong:', error);
        } else {
            console.log('Success!', token.id);
            this.setSuccess();
            // this.makePayment(token.id);
            // ...send the token to the your backend to process the charge
        }
    }


    setSuccess() {
        this.loader.nativeElement.style.display = 'block';
        this.myDiv.nativeElement.style.display = 'none';
    }


    makePayment(token) {
        stripe.charges.create({
            amount: 2000,
            currency: 'eur',
            source: token, // obtained with Stripe.js
            description: 'Charge for jenny.rosen@example.com'
        }, function(err, charge) {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
              console.log(JSON.stringify(charge));
            }
        });
    }

}
