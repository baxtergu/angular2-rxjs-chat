import { TestBed, inject } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { User, Thread, Message } from '../models/models';

describe('MessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService]
    });
  });

  it('should test', inject([MessagesService], (service: MessagesService) => {
    let user: User = new User('Nate', '');
    let thread: Thread = new Thread('t1', 'Nate', '');

    let m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    let m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    service.newMessages.subscribe((message: Message) => {
      console.log('=> messages： ' + message.text);
    });

    service.messages.subscribe((messages: Message[]) => {
      console.log('=> messages： ' + messages.length);
    });

    service.addMessage(m1);
    service.addMessage(m2);

    expect(service).toBeTruthy();
  }));
});
