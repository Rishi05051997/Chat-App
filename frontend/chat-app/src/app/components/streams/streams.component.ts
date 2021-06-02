import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
  token :any;

  constructor(
    private _tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.token = this._tokenService.getToken();
    console.log(this.token);
  }

}
