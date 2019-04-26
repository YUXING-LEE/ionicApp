import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { KEY_CODE } from '../../consts/key-code';
import { user } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

    private _subscriptions: Subject<void> = new Subject<void>();

    constructor(
        private userService: UserService,
        private router: Router,
        private toastService: ToastService) { }

    private loginData = new user;

    ngOnInit() {
        if (localStorage.getItem('jwtToken'))
            this.router.navigateByUrl('/home');
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.keyCode === KEY_CODE.ENTER) {
            this.login();
        }
    }

    private login() {
        this.userService.logIn(this.loginData).pipe(takeUntil(this._subscriptions)).subscribe(
            token => {
                this.toastService.success('登入中...');
                localStorage.setItem('jwtToken', token);
                this.router.navigateByUrl('/home');
                this.loginData = new user;
            }, err => {
                this.toastService.error('請確認輸入帳號與密碼');
                console.log(err);
            });
    }

}
