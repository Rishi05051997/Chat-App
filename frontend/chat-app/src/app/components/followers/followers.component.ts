import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import  io  from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  followers = [];
  user:any;
  socket: any;
  constructor(
    private tokenService: TokenService,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    console.log(this.user)
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser(){
    this.userService.getUserById(this.user._id).subscribe(
      res => {
        console.log(res.results)
        this.followers = res.results.followers;
      }, err => {
        console.log(err)
      }    )
  }

}
