import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private _tokenService: TokenService
  ){

  }
  ngOnInit(){
    //// this is implemented becoause if user is logged in due to some issue users logged in window is off
    /// for that case user not logged in again if token is exist in his/her cookies so it automatically get navigated to streams page
    const token = this._tokenService.getToken();
    if(token){
      this.router.navigate(['streams']);
    } else {
      this.router.navigate(['']);
    }
  }
}
