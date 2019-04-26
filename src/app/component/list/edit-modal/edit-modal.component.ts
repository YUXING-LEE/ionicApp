import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { book } from '../../../models/book.model';

import { BookService } from '../../../services/book.service';
import { ToastService } from '../../../services/toast.service';
@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

    private _subscriptions: Subject<void> = new Subject<void>();

    @Input() id: string;

    private bookObj = new book;

    constructor(private BookService: BookService,
        private toastService: ToastService,
        private modalController: ModalController,
        private alertController: AlertController) { }

    ngOnInit() {
        this.getBook(this.id);
    }

    private getBook(id) {
        this.BookService.getBookDetail(id).pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                this.bookObj = data;
            }, err => {
                this.toastService.error(err)
            });
    }

    private updateBook() {
        this.BookService.updateBook(this.id, this.bookObj).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.toastService.success("Update Done!!!");
                this.closeModal();
            }, err => {
                this.toastService.error(err)
            });
    }

    private deletebook() {
        this.BookService.deletebook(this.id).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.toastService.success("Delete Done!!!")
                this.closeModal();
            }, err => {
                this.toastService.error(err)
            });
    }

    private async confirmDelete(id) {
        const alert = await this.alertController.create({
            header: '確認刪除!',
            buttons: [
                { text: '確定', handler: () => { this.deletebook() } },
                { text: '取消' }
            ]
        });
        await alert.present();
    }

    private closeModal() {
        this.modalController.dismiss(true);
    }
}
