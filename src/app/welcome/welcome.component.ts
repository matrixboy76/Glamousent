import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { AuthenticationService } from '../_services';
import { ProductService } from '../_services/product.service';
@Component({ selector: 'app-welcome', templateUrl: 'welcome.component.html',styleUrls: ['./welcome.component.css'] })
export class WelcomeComponent {
    currentUser: any;
    public productList : any ;
    public totalItem : number = 0;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private cartService : CartService,
        private pds:ProductService,
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit(): void {
      this.cartService.getProducts1()
      .subscribe(res=>{
      this.totalItem = res.length;
    })
      this.pds.getProduct()
      .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
    //Lay product ra home index

  }

    login() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    createAcc(){
      this.authenticationService.logout();
      this.router.navigate(['/register']);
    }
}
