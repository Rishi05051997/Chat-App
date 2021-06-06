import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user:any;

  constructor(
    private _tokenService: TokenService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.user = this._tokenService.getPayload();
    console.log(this.user);
  }

  logout(){
    this._tokenService.deleteToken();
    this._router.navigate(['/']);
  }
}
