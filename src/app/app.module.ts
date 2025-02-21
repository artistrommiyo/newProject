import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';
import { HomeModule } from './features/home/home.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanComponent } from './features/plan/plan.component';
import { PaymentComponent } from './features/payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { TermsPolicyComponent } from './features/terms-policy/terms-policy.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    PlanComponent,
    PaymentComponent,
    TermsPolicyComponent,
    PrivacyPolicyComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    HomeModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
