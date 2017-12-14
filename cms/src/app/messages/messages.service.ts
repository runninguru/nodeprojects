import { Injectable, EventEmitter } from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const i in this.messages) {
      if (this.messages[i].id === id) {
        return this.messages[i];
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages);
  }

}
