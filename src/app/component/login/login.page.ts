import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { user } from '../../models/user.model';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

    private _subscriptions: Subject<void> = new Subject<void>();

    constructor(
        private userService: UserService,
        private router: Router) { }

    public loginData = new user;

    ngOnInit() {
        if (localStorage.getItem('jwtToken'))
            this.router.navigateByUrl('/home');
    }

    public login() {
        this.userService.logIn(this.loginData).pipe(takeUntil(this._subscriptions)).subscribe(
            token => {
                localStorage.setItem('jwtToken', token);
                this.router.navigateByUrl('/home');
                console.log("OK")
            }, err => {
                console.log(err);
            });
    }

}
