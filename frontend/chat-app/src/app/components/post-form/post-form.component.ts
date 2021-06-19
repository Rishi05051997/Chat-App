import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  socket:any;
  socketHost:any;
  constructor(
    private fb: FormBuilder,
    private _postService: PostService
  ) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost,  { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  ngOnInit(): void {
    this.initPostForm();
  }

  initPostForm(){
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    })
  }

  submitPost(){
    console.log(this.postForm.value);
    this._postService.addPost(this.postForm.value).subscribe(
      data => {
        // console.log(data);
        //// here we r creating a refresh event for avaoiding refresh page
        this.socket.emit('refresh',{});
        this.postForm.reset();
      }
    )
  }

}
