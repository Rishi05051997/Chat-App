import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import  io  from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  socket:any;
  user:any;
  notifications = [];
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService
  ) {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
   }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload()
    this.GetUser()
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  GetUser(){
    this.usersService.getUserById(this.user._id).subscribe(
      data => {
        console.log(data)
        this.notifications = data.results.notifications.reverse();

      }, err => {
        console.log(err)
      }
    )

  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  MarkNotification(data){
    console.log(data);
    this.usersService.MarkNotification(data._id).subscribe(
      value =>{
        console.log(value);
        this.socket.emit('refresh', {})
      }, err => {
        console.log(err)
      }
    )
  }

  deleteNotification(data){
    console.log(data)
    this.usersService.MarkNotification(data._id, true).subscribe(
      value =>{
        console.log(value);
        this.socket.emit('refresh', {})
      }, err => {
        console.log(err)
      }
    )

  }

}
