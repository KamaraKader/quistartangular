import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES
    },
    {
        path: '',
        component: FullLayoutComponent,
        children: FullLayout_ROUTES
    }
];
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/public' },
  { path: 'public', loadChildren: () => import('./package/public/public.module').then(m => m.PublicModule) },
  { path: 'private', loadChildren: () => import('./package/private/private.module').then(m => m.PrivateModule) },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
