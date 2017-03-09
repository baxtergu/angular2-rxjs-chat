import { TestBed, inject } from '@angular/core/testing';

import { ThreadsService } from './threads.service';
import { MessagesService } from './messages.service';
import { Thread, Message, User } from '../models/models';
import * as _ from 'underscore';

describe('ThreadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreadsService, MessagesService]
    });
  });

  it('should collect the Threads from Messages', inject([ThreadsService], (service: ThreadsService) => {
    let nate: User = new User('Nate Murray', '');
    let felipe: User = new User('Felipe Coury', '');

    let t1: Thread = new Thread('t1', 'Thread 1', '');
    let t2: Thread = new Thread('t2', 'Thread 2', '');

    let m1: Message = new Message({
      author: nate,
      text: 'Hi!',
      thread: t1
    })

    let m2: Message = new Message({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: t1
    })

    let m3: Message = new Message({
      author: nate,
      text: 'Did you bring the briefcase?',
      thread: t2
    })

    let messagesService: MessagesService = new MessagesService();
    let threadsService: ThreadsService = new ThreadsService(messagesService);

    threadsService.threads
      .subscribe((threadIdx: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadIdx);
        let threadNames: string = _.map(threads, (t: Thread) => t.name)
          .join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames} `);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
    messagesService.addMessage(m3);

    expect(service).toBeTruthy();
  }));
});
