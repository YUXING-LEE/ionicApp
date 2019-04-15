import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth.service'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthService] },
    { path: 'home', loadChildren: './component/home/home.module#HomePageModule', canActivate: [AuthService] },
    { path: 'list', loadChildren: './component/list/list.module#ListPageModule', canActivate: [AuthService] },
    { path: 'login', loadChildren: './component/login/login.module#LoginPageModule'  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
