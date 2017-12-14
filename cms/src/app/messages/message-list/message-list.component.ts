import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();
    this.messagesService.messageChangeEvent
      .subscribe(
        (messages: Message[]) => {
          console.log('ngoninit in subscribe() message-list.component');
          this.messages = messages;
        }
      );
  }

  onAddMessage(message: Message) {
    console.log('in method onAddMessage in message-list.component.ts');
    console.log('message: [' + message + ']');
    this.messages.push(message);
  }

}
