import {
    Component,
    AfterViewInit,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {ParkopolyService} from '../../services/parkopoly.service';
declare var Stripe: any;
const stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const elements = stripe.elements();

@Component({
  selector: 'app-create-transaction',
  templateUrl: './Transactions.component.html',
  styleUrls: ['./Transactions.component.css'],
    providers: [ParkopolyService]
})
export class TransactionComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('cardInfo') cardInfo: ElementRef;
    @ViewChild('SubmitButton') SubmitButton: ElementRef;
    @ViewChild('myDiv') myDiv: ElementRef;
    @ViewChild('loader') loader: ElementRef;
    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;
    paymentInQuestion: Observable<{}>;
    PaymentObject: object;
    TransactionID: string;


  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private db: AngularFireDatabase, private PkService: ParkopolyService) { }

  ngOnInit() {
      this.loader.nativeElement.style.display = 'none';
      this.myDiv.nativeElement.style.display = 'block';
      this.route.params.subscribe( params => {
        this.TransactionID = params['id'];
          this.paymentInQuestion =  this.db.object('Transactions/' + params['id']).valueChanges();
          this.paymentInQuestion.subscribe(res =>  {
            this.PaymentObject = res;
            if (res.payed === 'false') {
              this.setNormalBlock();
            } else {
                this.setSuccess();
            }
          });
      });
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
          this.PkService.MakePayment((this.PaymentObject.amount * 100),  token.id, 'nothing', this.TransactionID).subscribe(res => {
              this.setSuccess();
          }, (err) => {
            console.log(JOSN.stringify(err));
          });
        }
    }


    setSuccess() {
        this.loader.nativeElement.style.display = 'block';
        this.myDiv.nativeElement.style.display = 'none';
    }


    setNormalBlock() {
        this.loader.nativeElement.style.display = 'none';
        this.myDiv.nativeElement.style.display = 'block';
    }




}
