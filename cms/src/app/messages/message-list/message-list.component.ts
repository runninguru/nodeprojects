import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('2', 'title here', 'This is a message', 'Kyle Birch'),
    new Message('3', 'another title', 'another message', 'Don'),
    new Message('4', 'last title', 'last message', 'Tom')
    ];
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    console.log('in method onAddMessage in message-list.component.ts');
    this.messages.push(message);
  }

}
