import { Routes } from '@angular/router';
import { SoapsBeardComponent } from './pages/customer/soaps/beard/soaps-beard/soaps-beard.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [

    { path: 'soaps/beard', component: SoapsBeardComponent },
    { 
        path: 'admin/product', 
        component: ProductComponent,
        canActivate: [ authGuard ],
        data: { roles: ['Admin'] }
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
