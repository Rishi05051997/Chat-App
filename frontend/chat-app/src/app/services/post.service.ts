import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASEURL = 'http://localhost:3000/api/chatapp'
  constructor(
    private http: HttpClient
  ) { }

  addPost(body) :Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/post/add-post`, body);
  }

  getAllPosts() :Observable<any>{
    return this.http.get<any>(`${this.BASEURL}/posts`);
  }

  addPostLike(body) :Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/post/add-like`, body);
  }
}
