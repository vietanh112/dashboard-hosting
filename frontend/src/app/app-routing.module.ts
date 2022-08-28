import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {environment} from "../environments/environment";
import {CoreComponentLayout} from "../app/_core/components/layout/layout.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/list',
        pathMatch: 'full'
    },
    //auth
    // {
    //     path: '',
    //     loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    //     data: { preload: true }
    // },
    // dashboard
    {
        path: 'dashboard',
        component: CoreComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                data: { preload: true }
            }
        ]
    },
    
    /**
     * Page 404
     */
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {
}
