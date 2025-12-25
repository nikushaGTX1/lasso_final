import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { About } from './about/about';
import { Main } from './main/main';
import { Products } from './products/products';
import { ProductsResolver } from './products/products.resolver';
import { DetailsPage } from './details-page/details-page';
import { ProductDetailsResolver } from './details-page/product-details.resolver';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Admin } from './admin/admin';
import { AdminAddCard } from './admin-add-card/admin-add-card';
import { AdminGuard } from './guards/admin.guard';
import { Contact } from './contact/contact';

const routes: Routes = [
  { path: '', component: Main },

  { path: 'about-us', component: About },

  {
    path: 'products',
    component: Products,
    resolve: { creams: ProductsResolver }
  },

  {
    path: 'product/:id',
    component: DetailsPage,
    resolve: { product: ProductDetailsResolver },
    runGuardsAndResolvers: 'paramsChange'
  },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin', component: AdminAddCard, canActivate: [AuthGuard] },
  { path: 'admin-cards', component: AdminAddCard, canActivate: [AdminGuard] },
  { path: 'contact', component: Contact},



  // 👇 WILDCARD MUST ALWAYS BE LAST
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
