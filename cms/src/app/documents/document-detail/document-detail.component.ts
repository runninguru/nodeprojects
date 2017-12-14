import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(private route: ActivatedRoute,
              private documentsService: DocumentsService,
              private router: Router,
              private windowRefService: WindRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id + ' is the id of the documentdetail document');
    this.document = this.documentsService.getDocument(id);
    this.route.params
      .subscribe(
        (params) => {
          this.document = this.documentsService.getDocument(params.id);
        }
      );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    console.log('tried to delete a document. In onDelete method.');
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
