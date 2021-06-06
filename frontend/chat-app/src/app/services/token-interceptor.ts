import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private injector: Injector
  ){}

  intercept(req, next): Observable<HttpEvent<any>>{
    // return next.handle(req)
    /// here creating an object i.e.., headerConfig which contain content-type, accept properties
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    //// here we r getting token value form cookies which are saved in token service
    // const token = this._tokenService.getToken();
    let _tokenService = this.injector.get(TokenService)
    const token = _tokenService.getToken();
    //// here if token is present inside cookies then we r setting authorization property inside an object
    if(token) {
      headerConfig['Authorization'] = `Bearer ${token}`;
    }
    //// here we r cloning the request i.e.., replica of existing request with some more properties
    const _req = req.clone({
      setHeaders: headerConfig
    });
    return next.handle(_req);
  }
}
