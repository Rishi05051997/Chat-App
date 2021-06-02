import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASEURL = 'http://localhost:3000/api/chatapp'
  constructor(
    private http : HttpClient
  ) { }

  registerUser(body): Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/register`,body);
  }

  loginUser(body): Observable<any>{
    return this.http.post<any>(`${this.BASEURL}/login`, body);
  }
}
