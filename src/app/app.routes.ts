import { Routes } from '@angular/router';
import { SoapsBeardComponent } from './pages/customer/soaps/beard/soaps-beard/soaps-beard.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { HomeComponent } from './core/components/home/home.component';
import { SubcategoryComponent } from './pages/admin/subcategory/subcategory.component';
import { CategoryComponent } from './pages/admin/category/category.component';

export const routes: Routes = [

    { path: 'soaps/beard', component: SoapsBeardComponent },
    { 
        path: 'admin/product', 
        loadComponent: () => import('./pages/admin/product/product.component')
            .then((m) => m.ProductComponent),
        canActivate: [ authGuard ],
        data: { roles: ['Admin'] }
    },
    { 
        path: 'admin/subcategory', 
        component: SubcategoryComponent,
        canActivate: [ authGuard ],
        data: { roles: ['Admin'] }
    },
    { 
        path: 'admin/category', 
        component: CategoryComponent,
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
