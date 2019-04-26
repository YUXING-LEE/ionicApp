import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthService } from './services/auth.service'

import { LoginPage } from './component/login/login.page';
import { HomePage } from './component/home/home.page';
import { ListPage } from './component/list/list.page';

import { CreateModalComponent } from './component/list/create-modal/create-modal.component';
import { EditModalComponent } from './component/list/edit-modal/edit-modal.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthService] },
    { path: 'home', component: HomePage, canActivate: [AuthService] },
    { path: 'list', component: ListPage, canActivate: [AuthService] },
    { path: 'login', component: LoginPage }
];

@NgModule({
    declarations: [
        HomePage,
        LoginPage,
        ListPage,
        CreateModalComponent,
        EditModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    entryComponents:[
        CreateModalComponent,
        EditModalComponent
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
