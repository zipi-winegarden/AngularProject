import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { authenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/log-out/log-out.component';



@NgModule({
  declarations: [LogoutComponent,LoginComponent,RegisterComponent],
  imports: [
    CommonModule,ReactiveFormsModule,authenticationRoutingModule
  ]
})
export class AuthenticationModule { }
