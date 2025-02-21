import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { HomeComponent } from './features/home/home.component';
import { PlanComponent } from './features/plan/plan.component';
import { PaymentComponent } from './features/payment/payment.component';
import { TermsPolicyComponent } from './features/terms-policy/terms-policy.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route to Home
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlanComponent },
  { path: 'payment', component: PaymentComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: SignupComponent },
  { path: 'terms-policy', component: TermsPolicyComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'users', component: UserDetailsComponent },
  { path: '**', redirectTo: '/home' }, // Wildcard route redirects to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
