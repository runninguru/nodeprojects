import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  // @ViewChild('subject') subjectReference: ElementRef;
  @ViewChild('subject') subjectReference;
  @ViewChild('messageBody') messageReference;
  // subject = '';
  // messageBody = '';
  currentSender = 'Kyle';
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    console.log('onSendMessage() in message-edit.component.ts');
    const s = this.subjectReference.nativeElement.value;
    const m = this.messageReference.nativeElement.value;
    if (s !== '' && m !== '') {
      this.addMessageEvent.emit(
        new Message('1', s, m, this.currentSender)
      );
    }
  }

  onClear() {
    console.log('onClear() in message-edit.component.ts');
    this.subjectReference.nativeElement.value = '';
    this.messageReference.nativeElement.value = '';
  }

}
