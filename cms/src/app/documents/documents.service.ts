import { Injectable, EventEmitter} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId = 0;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    console.log(this.documents.slice());
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const i in this.documents) {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
    return null;
  }
  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }
    this.documents.splice(index, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (const x in this.documents) {
      /* tslint:disable-next-line */
      const currentId =  parseInt(this.documents[x].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  public addDocument(newDocument: Document) {
    if (typeof(newDocument) === 'undefined' || newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  public updateDocument(originalDocument: Document, newDocument: Document) {
    if (typeof(originalDocument) === 'undefined'
      || originalDocument === null
      || typeof(newDocument) === 'undefined'
      || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
