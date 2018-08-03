import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ISConnectedService} from './services/iSConnected.service';
import {LoginComponent} from './components/login/login.component';
import {CustomerComponent} from './components/customer/customer.component';
import {TransactionComponent} from './components/Transactions/Transactions.component';

// canActivate: [ISConnectedService]

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent},
    { path: 'login',  component: LoginComponent},
    { path: 'customer',  component: CustomerComponent},
    {path: 'transactions', component: TransactionComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false, enableTracing: true })],
    exports: [RouterModule],
    providers: [
        ISConnectedService
       // AuthService,
       // LoginService
    ]
})

export class AppRoutingModule {

}