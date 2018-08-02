import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ParkopolyService} from './services/parkopoly.service';
import {FirebaseService} from './services/firebase.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {ISConnectedService} from './services/iSConnected.service';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CreateTransactionComponent } from './components/Transactions/Transactions.component';
import {MomentModule} from 'ngx-moment';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {MatSidenavModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomerMapFollowComponent } from './components/customer-map-follow/customer-map-follow.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerComponent,
    PaymentComponent,
    InvoiceComponent,
    CreateTransactionComponent,
    CustomerMapFollowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      MomentModule,
      AppRoutingModule,
      GooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
    AngularFireDatabaseModule,
      MatProgressBarModule,
      MatGridListModule,
      MatBadgeModule,
      MatMenuModule,
      MatButtonModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatSelectModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [ParkopolyService, FirebaseService, ISConnectedService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
