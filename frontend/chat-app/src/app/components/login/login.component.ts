import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String;
  showSpinner = false;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router : Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.initLogin();
  }

  initLogin(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password:['',Validators.required]
    })
  }

  loginUser(){
    this.showSpinner = true;
    this._authService.loginUser(this.loginForm.value).subscribe(
      data => {
        // console.log(data);
        this.tokenService.setToken(data.token);
        this.loginForm.reset();
        setTimeout(()=> {
          this.router.navigate(['streams']);
        }, 3000)
      },
      err => {
        this.showSpinner = false;
        console.log(err);
        // debugger;
        if(err.error.msg){
          this.errorMessage = err.error.msg[0].message;
        }
        if(err.error.message){
          this.errorMessage = err.error.message;
        }
      }
    )
  }

}
