import { Component, OnInit } from '@angular/core';
import {DocumentsService} from '../documents.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Document} from '../document.model';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  originalDocument: Document;
  editMode = false;
  documentId;
  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params) => {
          if (typeof(id) === 'undefined' || id === null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentsService.getDocument(id);
          if (typeof(this.originalDocument) === 'undefined' || this.originalDocument == null) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(this.documentId, value.documentTitle, value.documentDescription, value.documentUrl);
    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentsService.addDocument(newDocument);
    }
    this.editMode = false;
    form.reset();
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
