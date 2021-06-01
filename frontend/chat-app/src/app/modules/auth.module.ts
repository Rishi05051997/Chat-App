import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';




@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AuthTabsComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
