import { ProductService } from './_services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { appRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MenComponent } from './Products/men/men.component';
import { GirlComponent } from './Products/girl/girl.component';
import { DefaultComponent } from './Products/default/default.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { SearchProductComponent } from './search-product/search-product.component';

@NgModule({
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],//error : router-outlet is not know element
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        WelcomeComponent,
        ShoppingCartComponent,
        AdminViewComponent,
        OrdersComponent,
        AboutComponent,
        HeaderComponent,
        ContactusComponent,
        MenComponent,
        GirlComponent,
        DefaultComponent,
        ProductDetailComponent,
        FooterComponent,
        SearchProductComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider,
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
