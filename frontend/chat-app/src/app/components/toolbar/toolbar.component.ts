import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _tokenService: TokenService,
    private _router : Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._tokenService.deleteToken();
    this._router.navigate(['/']);
  }
}
