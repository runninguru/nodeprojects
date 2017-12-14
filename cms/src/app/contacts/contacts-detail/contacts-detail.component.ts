import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactsService} from '../contact.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contact;
  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log('contacts-detail in ngoninit(), id: [' + id + ']');
    this.contact = this.contactsService.getContact(id);
    this.route.params
      .subscribe(
        (params) => {
          this.contact = this.contactsService.getContact(params.id);
        }
      );
  }

  onDelete() {
    this.contactsService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
