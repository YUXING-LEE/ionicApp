import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '../../models/book.model';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {
    private _subscriptions: Subject<void> = new Subject<void>();


    constructor(private router: Router,
        private Bookservice: BookService) { }

    books = new Array<book>();

    ngOnInit(): void {
        this.getAllBooks();
    }

    public getAllBooks(): void {
        this.Bookservice.getBooks().pipe(takeUntil(this._subscriptions)).subscribe(
            books => {
                this.books = books;
            }, err => {
                console.log(err);
            });
    }

    // public createBook(): void {
    //     this.createModal.show();
    // }

    // public getBookDetail(id: string): void {
    //     this.editModal.getBook(id);
    // }
}
