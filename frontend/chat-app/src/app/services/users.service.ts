import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BASEURL = 'http://localhost:3000/api/chatapp';
  constructor(
    private http: HttpClient,
  ) { }

  GetAllUsers(): Observable<any>{
    return this.http.get(`${this.BASEURL}/users`);
  }

  followUser(userFollowed:any):Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/follow-user`, {userFollowed})
  }

  unFollowUser(userFollowed:any):Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/unfollow-user`, {userFollowed})
  }

  getUserById(id:any) :Observable<any>{
    return this.http.get<any>(`${this.BASEURL}/user/${id}`)
  }

  getUserByUsername(Uname:any) :Observable<any>{
    return this.http.get<any>(`${this.BASEURL}/user/${Uname}`)
  }


}
