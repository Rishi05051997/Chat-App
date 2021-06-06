import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private cookieService: CookieService
  ) { }

  setToken(token){
    // debugger
    return this.cookieService.set('chat_token', token);
  }

  getToken(){
    // debugger
    return this.cookieService.get("chat_token");
  }

  deleteToken(){
    return this.cookieService.delete('chat_token');
  }

  getPayload(){
    const token = this.getToken();
    let payload;
    if(token) {
      //// here we splitted token normal token format :- header[0].payload[1].signature[2] --->>> xxxx.yyyy.zzzz
      payload = token.split('.')[1];
      ///// by using atob() method to decrypt base64 String
      payload =  JSON.parse(window.atob(payload));
    }

    return payload.data;
  }
}
