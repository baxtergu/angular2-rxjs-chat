import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FromNowPipe } from './util/from-now.pipe';
import { ChatNavBarComponent } from './components/chat-nav-bar/chat-nav-bar.component';
import { ChatThreadComponent, ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { ChatMessageComponent, ChatWindowComponent } from './components/chat-window/chat-window.component';

import { servicesInjectables } from './services/services.service';
import { utilInjectables } from './util/util';

// import {
//   MessagesService,
//   ThreadsService,
//   UserService
// } from './services/services.service';

// import { ChatExampleData } from './data/ChatExampleData';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    utilInjectables
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [servicesInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
