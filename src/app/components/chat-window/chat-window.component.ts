import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  MessagesService,
  ThreadsService,
  UserService
} from '../../services/services.service';
import { Observable } from 'rxjs';
import { User, Thread, Message } from '../../models/models';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private userService: UserService,
    private el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser
      .subscribe(
      (user: User) => {
        this.currentUser = user;
      });

    this.messages
      .subscribe(
      (messages: Array<Message>) => {
        setTimeout(() => {
          this.scrollToBottom();
        });
      });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}

@Component({
  inputs: ['message'],
  selector: 'app-chat-message',
  template: `
  <div class="msg-container"
       [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">

    <div class="avatar"
         *ngIf="!incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>

    <div class="messages"
      [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
      <p>{{message.text}}</p>
      <p class="time">{{message.author.name}} • {{message.sentAt | fromNow}}</p>
    </div>

    <div class="avatar"
         *ngIf="incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>
  </div>
  `
})
export class ChatMessageComponent implements OnInit {
  message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser
      .subscribe(
      (user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
  }

}
