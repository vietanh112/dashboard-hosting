import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {environment} from "../environments/environment";
import {DashboardComponentLayout} from "../app/_core/components/layout/layout.component";
import {CoreComponentLayout} from "../app/_core/components/layout-core/layout.component";
import {CustomPreloadingStrategy} from './custom-preloading';
import {AuthComponentLayout} from './_core/components/layout-auth/layout.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/hosting/list',
        pathMatch: 'full'
    },
    //auth
    // {
    //     path: '',
    //     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    //     data: { preload: true }
    // },
    // dashboard
    {
        path: 'dashboard',
        component: DashboardComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                data: { preload: true }
            }
        ]
    },
    // core
    {
        path: 'core',
        component: CoreComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
                data: { preload: true }
            }
        ]
    },
    // auth-manage
    {
        path: 'auth',
        component: AuthComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
                data: { preload: true }
            }
        ]
    },
    
    /**
     * Page 404
     */

     { path: '**', redirectTo: '/dashboard/hosting/list' }
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        preloadingStrategy: CustomPreloadingStrategy,
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule],
    providers: [CustomPreloadingStrategy]
  })

export class AppRoutingModule {
}
