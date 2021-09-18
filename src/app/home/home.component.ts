import { ProductService } from './../_services/product.service';
import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { FormBuilder , FormGroup } from '@angular/forms';
import { CartService } from '../_services/cart.service';
@Component({ templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
 })
export class HomeComponent {
    UserLG :string ='';
    temp:string='';
    public productList : any ;
    currentUser: any;
    productData!:any;
    formValue!: FormGroup;
    constructor(
        private authenticationService: AuthenticationService,
        private pds:ProductService,
        private formBuilder:FormBuilder,
        private cartService : CartService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
      ngOnInit(): void {
      this.pds.getProduct()
      .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
    //Lay product ra home index

  }
  getProducts(){
    this.pds.getProduct()
    .subscribe(res => {this.productData = res;})
  }
  sliceUser()
  {
    this.temp = this.UserLG;
    return this.temp.slice(5);
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  
  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }

}
