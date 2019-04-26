import { Component, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { book } from '../../../models/book.model';

import { BookService } from '../../../services/book.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    private bookObj = new book;

    constructor(private BookService: BookService,
        private modalController: ModalController,
        private toastService: ToastService) { }

    private saveBook() {
        this.BookService.saveBook(this.bookObj).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.toastService.success("建立成功");
                this.closeModal();
                this.bookObj = new book;
            }, (err) => {
                this.toastService.error(err);
            });
    }

    private closeModal() {
        this.modalController.dismiss(true);
    }
}
