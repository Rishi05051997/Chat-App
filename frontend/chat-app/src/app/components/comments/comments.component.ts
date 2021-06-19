import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  constructor(
    private fb: FormBuilder,
    private _postService: PostService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.actRoute.snapshot.paramMap.get('id');
    this.initCommentForm()
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
        console.log(data)
      }, err => {
        console.log(err)
      }
    )
  }


}
