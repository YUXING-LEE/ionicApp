import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './component/app/app.component';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { AuthService } from './services/auth.service';
import { StockService } from './services/stock.service';
import { ToastService } from './services/toast.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        UserService,
        AuthService,
        StockService,
        BookService,
        ToastService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
