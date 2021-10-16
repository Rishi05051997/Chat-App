import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
  token :any;
  streamsTabs = false;
  topStreamsTabs = false;
  constructor(
    private _tokenService: TokenService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.streamsTabs = true;
    this.token = this._tokenService.getPayload()
    console.log(this.token);
    const tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs, {});
  }

  changeTabs(value){
    console.log(value)
    if(value == "streams"){
      this.streamsTabs = true;
      this.topStreamsTabs = false;
    }
    if(value == "top"){
      this.streamsTabs = false;
      this.topStreamsTabs = true;
    }
  }



}
