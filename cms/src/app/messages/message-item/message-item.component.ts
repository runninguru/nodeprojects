import { Component, OnInit, Input } from '@angular/core';
import {ContactsService} from '../../contacts/contact.service';
import { Message } from '../message.model';
import { Contact} from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactsService]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    console.log('[' + this.message.id + ']');
    console.log('[' + this.message.subject + ']');
    console.log('[' + this.message.msgText + ']');
    console.log('[' + this.message.sender + ']');
    const contact: Contact = this.contactsService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
