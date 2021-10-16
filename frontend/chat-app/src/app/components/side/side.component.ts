import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  socketHost:any;
  socket:any;
  user:any;
  userData:any;
  constructor(
    private _tokenService: TokenService,
    private _userService: UsersService
  ) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost,  { transports: ['websocket', 'polling', 'flashsocket'] });
   }

  ngOnInit(): void {
    this.user = this._tokenService.getPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    })

  }

  getUser(){
    this._userService.getUserById(this.user._id).subscribe(
      res => {
        console.log(res)
        this.userData = res.results;
        console.log(this.userData);
      }, err => {

      }
    )
  }

}
