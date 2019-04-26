import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookService } from '../../services/book.service';

import { book } from '../../models/book.model';

import { CreateModalComponent } from './create-modal/create-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {
    private _subscriptions: Subject<void> = new Subject<void>();


    constructor(private router: Router,
        private Bookservice: BookService,
        private modalController: ModalController) { }

    private books = new Array<book>();

    ngOnInit(): void {
        this.getAllBooks();
    }

    private getAllBooks(): void {
        this.Bookservice.getBooks().pipe(takeUntil(this._subscriptions)).subscribe(
            books => {
                this.books = books;
            }, err => {
                console.log(err);
            });
    }

    private async createBook() {
        const modal = await this.modalController.create({
            component: CreateModalComponent
        })
        this.closeModal(modal);
    }

    private async getBookDetail(id: string) {
        const modal = await this.modalController.create({
            component: EditModalComponent,
            componentProps: {
                id: id
            }
        })
        this.closeModal(modal);
    }

    private async closeModal(modal) {
        modal.onDidDismiss().then((status) => {
            if (status.data)
                this.getAllBooks();
        });
        return await modal.present()
    }

}
