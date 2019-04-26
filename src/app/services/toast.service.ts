import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

    constructor(private toastController: ToastController) { }

    public async success(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: "success",
            position: "top"
        });
        toast.present();
    }

    public async error(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: "danger",
            position: "top"
        });
        toast.present();
    }
}
