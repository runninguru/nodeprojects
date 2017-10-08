import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectReference: ElementRef;
  @ViewChild('message') messageReference: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Kyle';
  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subj = this.subjectReference.nativeElement.value;
    const mes = this.messageReference.nativeElement.value;
    const newMess = new Message(1, this.currentSender, subj, mes);
    this.addMessageEvent.emit(newMess);
  }

  onClear(){
    this.subject = '';
    this.message = '';
  }

}
