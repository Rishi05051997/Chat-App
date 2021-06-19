import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts = [];
  socketHost:any;
  socket:any;
  user:any;
  constructor(
    private _postService: PostService,
    private _tokenService: TokenService
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
        this.posts = data.posts;

      },
      err => {
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



}
