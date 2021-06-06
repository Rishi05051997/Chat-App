import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _postService: PostService
  ) { }

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
        console.log(data);
        this.postForm.reset();
      }
    )
  }

}
