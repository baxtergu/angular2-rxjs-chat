import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThreadsService } from '../../services/services.service';
import { Observable } from 'rxjs';
import { Thread } from '../../models/models';

@Component({
  selector: 'app-chat-threads',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  threads: Observable<any>;

  constructor(private threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit() {
  }

}

@Component({
  inputs: ['thread'],
  selector: 'app-chat-thread',
  template: `
  <div class="media conversation">
    <div class="pull-left">
      <img class="media-object avatar" 
           src="{{thread.avatarSrc}}">
    </div>
    <div class="media-body">
      <h5 class="media-heading contact-name">{{thread.name}}
        <span *ngIf="selected">&bull;</span>
      </h5>
      <small class="message-preview">{{thread.lastMessage.text}}</small>
    </div>
    <a (click)="clicked($event)" class="div-link">Select</a>
  </div>
  `
})
export class ChatThreadComponent implements OnInit {
  thread: Thread;
  selected: boolean = false;

  constructor(private threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    this.threadsService.currentThread
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
