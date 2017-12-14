import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import {DocumentsService} from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  documents = [];

  constructor(private DocumentsService: DocumentsService) { }

  ngOnInit() {
    this.DocumentsService.documentSelectedEvent
      .subscribe(
        (document: Document) => {
          console.log('emit event ngoninit() in documents.service.ts in documents.component.ts');
          this.selectedDocument = document;
        }
      );
  }

}
