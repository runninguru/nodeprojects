import { Component, OnInit } from '@angular/core';
import {Contact} from '../contact.model';
import {ContactsService} from '../contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  hasGroup = false;
  invalidGroupContact = false;
  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params) => {
          if (typeof(id) === 'undefined' || id == null) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactsService.getContact(id);
          if (typeof(this.originalContact) === 'undefined' || this.originalContact == null) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.contact.group != null && this.contact.group.length > 0) {
            this.hasGroup = true;
            this.groupContacts = this.contact.group.slice();
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      String(this.contactsService.getMaxId()),
      value.name,
      value.email,
      value.phone,
      value.url,
      this.groupContacts);
    if (this.editMode) {
      this.contactsService.updateContact(this.originalContact, newContact);
    } else {
      this.contactsService.addContact(newContact);
    }
    this.editMode = false;
    form.reset();
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (this.editMode === false) {
      return false;
    }
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    // console.log("Contact Droped: ",selectedContact)
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
