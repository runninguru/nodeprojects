import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';
import { ContactsService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  contacts = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          console.log('emit event ngoninit() in contact.service.ts in contacts.component.ts');
          this.selectedContact = contact;
        }
      );
  }

}
