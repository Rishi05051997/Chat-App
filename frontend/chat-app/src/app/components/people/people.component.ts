import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service';
import  io  from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser:any;
  userArr = [];
  socket: any;
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,

  ) {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.getPayload();
    this.getAllUsers();
    this.getAllUserById();
    this.socket.on('refreshPage', () => {
      this.getAllUsers();
      this.getAllUserById();
    })
  }


  getAllUsers(){
    this.userService.GetAllUsers().subscribe(
      res => {
        console.log(res);
        _.remove(res.results, {username: this.loggedInUser.username})
        this.users = res.results;
      }, err => {
        console.log(err)
      }
    )
  }

  getAllUserById(){
    this.userService.getUserById(this.loggedInUser._id).subscribe(
      res => {
        console.log(res);
        this.userArr = res.results.following;
      }, err => {
        console.log(err)
      }
    )
  }

  followUser(user:any){
    this.userService.followUser(user._id).subscribe(
      res => {
        console.log(res);
        this.socket.emit('refresh', {})

      }, err => {
        console.log(err)
      }
    )
  }

  checkInArray(arr, id){
    const result = _.find(arr, ['userFollowed._id', id]);
    if(result){
      return true;
    } else {
      return false;
    }
  }

}
