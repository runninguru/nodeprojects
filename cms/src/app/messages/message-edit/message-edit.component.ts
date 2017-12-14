import {Component, OnInit, Output, EventEmitter, NgModule, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Message } from '../message.model';
import {MessagesService} from '../messages.service';

@NgModule({
  imports: [FormsModule],
  }
)

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})

export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectReference;
  @ViewChild('messageBody') messageReference;
  // subject = '';
  // messageBody = '';
  currentSender = '0';
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    console.log('onSendMessage() in message-edit.component.ts');
    console.log('[' + this.subjectReference + ']');
    console.log('[' + this.messageReference + ']');
    console.log('[' + this.currentSender + ']');
    if (this.subjectReference !== '' && this.messageReference !== '') {
      this.messagesService.addMessage(
        new Message('id1',
          this.subjectReference,
          this.messageReference,
          this.currentSender)
      );
    }
  }

  onClear() {
    console.log('onClear() in message-edit.component.ts');
    this.subjectReference = '';
    this.messageReference = '';
  }

}
