import { Component } from '@angular/core';
import {
  MessagesService,
  ThreadsService,
  UserService
} from './services/services.service';

import { ChatExampleData } from './data/ChatExampleData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/styles.scss']
})
export class AppComponent {
  constructor(private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private userService: UserService) {
    ChatExampleData.init(messagesService, threadsService, userService);
  }
}
