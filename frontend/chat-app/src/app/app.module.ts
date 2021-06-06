import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthTabsComponent } from './components/auth-tabs/auth-tabs.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsComponent } from './components/streams/streams.component';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { CookieService } from "ngx-cookie-service";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './services/token-interceptor';


@NgModule({
  declarations: [
    AppComponent,


],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    StreamsModule,
    StreamsRoutingModule
  ],
  exports:[

  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
