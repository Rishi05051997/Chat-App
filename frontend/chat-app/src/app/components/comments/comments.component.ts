import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  commentArray = [];
  socket: any;
  post: string;
  constructor(
    private fb: FormBuilder,
    private _postService: PostService,
    private actRoute: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

   }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.actRoute.snapshot.paramMap.get('id');
    this.initCommentForm();
    this.getSinglePost();

    this.socket.on('refreshPage', (data)=> {
      this.getSinglePost();
    })
  }

  ngAfterViewInit(){
    this.toolbarElement.style.display = 'none';
  }

  initCommentForm(){
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  addComment(){
    console.log(this.commentForm.value);
    this._postService.addComments(this.postId, this.commentForm.value.comment).subscribe(
      data => {
        // console.log(data);
        this.socket.emit('refresh', {});
        this.commentForm.reset();
      }, err => {
        console.log(err)
      }
    )
  }

  getSinglePost(){
    this._postService.getSinglePost(this.postId).subscribe(
      data =>{
        // console.log(data);
        this.post = data.post.post;
        // console.log(this.post, "Post are coming")
        this.commentArray = data.post.comments.reverse();
        // console.log(this.commentArray)
      }, err => {
        console.log(err)
      }
    )
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }


}
