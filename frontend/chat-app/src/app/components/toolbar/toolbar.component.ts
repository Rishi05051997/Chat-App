import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M  from 'materialize-css'
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user:any;
  notifications = [];
  socket :any;
  socketHost:any;
  count = [];
  constructor(
    private _tokenService: TokenService,
    private _router : Router,
    private userService: UsersService,
  ) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost,  { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit(): void {
    this.user = this._tokenService.getPayload();
    console.log(this.user);

    const dropDownElements = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElements, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })
    this.GetUser()
    this.socket.on('refreshPage', ()=> {
      this.GetUser();
    });
  }

  GetUser(){
    this.userService.getUserById(this.user._id).subscribe(
      data => {
        console.log(data)
        this.notifications = data.results.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        console.log(value)
        this.count = value

      }, err => {
        if(err.error.token === null){
          this._tokenService.deleteToken();
          this._router.navigate([''])
        }
        console.log(err)
      }
    )
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  logout(){
    this._tokenService.deleteToken();
    this._router.navigate(['/']);
  }

  GotoHome(){
    this._router.navigate(['streams'])
  }

  MarkAll(){
    this.userService.MarkAllAsRead().subscribe(
      data => {
        console.log(data)
        this.socket.emit('refresh', {});
      }, err => {
        console.log(err)
      }
    )
  }
}
