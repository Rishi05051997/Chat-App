import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
  token :any;

  constructor(
    private _tokenService: TokenService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.token = this._tokenService.getPayload()
    console.log(this.token);
  }



}
