import { SearchProductComponent } from './search-product/search-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GirlComponent } from './Products/girl/girl.component';
import { MenComponent } from './Products/men/men.component';
import { DefaultComponent } from './Products/default/default.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AuthGuard } from './_helpers';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent , pathMatch:'full'},
    { path:'home',component:HomeComponent,
      children:[
        {
          path:'featured',component:DefaultComponent
        },
        {
          path:'girl',component:GirlComponent
        },
        {
          path:'men',component:MenComponent
        }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path:'home/cart',component:ShoppingCartComponent},
    { path:'home/productDetail/:id/cart',component:ShoppingCartComponent},
    { path:'admin',component: AdminViewComponent },
    { path:'admin/order',component: OrdersComponent },
    { path:'about',component:AboutComponent},
    {path:'contact',component:ContactusComponent},
    { path:'home/productDetail/:id',component:ProductDetailComponent},
    { path:'home/search',component:SearchProductComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
