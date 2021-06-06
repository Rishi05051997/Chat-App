import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: String;
  showSpinner= false;
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['',[Validators.email, Validators.required]],
      password:['',Validators.required]
    })
  }


  signUpUser(){
    this.showSpinner = true;
    // console.log(this.signupForm.value);
    this._authService.registerUser(this.signupForm.value).subscribe(
      data => {
        // console.log(data);

        this.tokenService.setToken(data.token);
        this.signupForm.reset();
        setTimeout(()=> {
          this.router.navigate(['streams']);
        }, 3000)
      },
      err => {
        this.showSpinner = false;
        console.log(err);
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
