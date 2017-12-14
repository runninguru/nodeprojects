import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Contact} from './contact.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContactsService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId = 0;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    console.log(this.contacts.slice());
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const i in this.contacts) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
  }
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }
    this.contacts.splice(index, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (const x in this.contacts) {
      /* tslint:disable-next-line */
      const currentId =  parseInt(this.contacts[x].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  public addContact(newContact: Contact) {
    if (typeof(newContact) === 'undefined' || newContact == null) {
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  public updateContact(originalContact: Contact, newContact: Contact) {
    if (typeof(originalContact) === 'undefined'
      || originalContact === null
      || typeof(newContact) === 'undefined'
      || newContact === null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
