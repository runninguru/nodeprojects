import { Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import {ContactsService} from '../contact.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  private newContactSubscription;
  constructor(private contactsService: ContactsService) {}
  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.subscription = this.contactsService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
