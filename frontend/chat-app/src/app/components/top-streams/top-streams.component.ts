import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.scss']
})
export class TopStreamsComponent implements OnInit {
  topPosts = [];
  socketHost:any;
  socket:any;
  user:any;
  constructor(
    private _postService: PostService,
    private _tokenService: TokenService,
    private _router: Router

  ) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost,  { transports: ['websocket', 'polling', 'flashsocket'] });
   }

  ngOnInit(): void {
    this.user = this._tokenService.getPayload()
    this.allPosts();
    //// here we r calling refresgPage event which is created on backend in stream.js file
    this.socket.on('refreshPage', (data)=> {
      this.allPosts();
    })
  }

  allPosts(){
    this._postService.getAllPosts().subscribe(
      data => {
        console.log(data);
        this.topPosts = data.top;

      },
      err => {
        if(err.error.token === null){
          this._tokenService.deleteToken();
          this._router.navigate([''])
        }
        console.log(err);
      }
    )
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  likePost(post){
    console.log(post);
    this._postService.addPostLike(post).subscribe(
      data => {
        console.log(data);
        this.socket.emit('refresh', {});
      }, err => {
        console.log(err);
      }
    )
  }

  checkInLikesArray(arr, username){
    return _.some(arr, {username: username})
  }

  openCommentBox(post) {
    this._router.navigate(['post', post._id])
  }


}
