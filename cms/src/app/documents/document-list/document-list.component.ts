import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();
  public documents: Document[] = [
    new Document('1', 'grocery list', 'It\'s a grocery list', 'docs.com'),
    new Document('2', 'recipe', 'A list of items contained in a recipe', 'recipe.com'),
    new Document('3', 'books to read', 'A list of my favorite books I haven\t read yet.', 'books.com'),
    new Document('4', 'to-do-list', 'a list of things I need to do', 'bored.com')
  ];

  constructor() { }

  ngOnInit() {
  }

  onDocumentSelected(document: Document) {
    console.log('inside method onDocumentSelected.');
    this.documentWasSelected.emit(document);
  }
}
