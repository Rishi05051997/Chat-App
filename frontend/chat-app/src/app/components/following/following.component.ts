import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import  io  from 'socket.io-client';



@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  following = [];
  user: any;
  socket: any;
  constructor(
    private tokenService: TokenService,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    })
  }

  getUser(){
    this.userService.getUserById(this.user._id).subscribe(
      res => {
        console.log(res.results)
        this.following = res.results.following
      }, err => {
        console.log(err)
      }    )
  }

  unfollow(user){
    console.log(user);
    this.userService.unFollowUser(user._id).subscribe(
      res => {
        console.log(res);
        this.socket.emit('refresh', {});

      }, err => {
        console.log(err)
      }    )
  }

}
