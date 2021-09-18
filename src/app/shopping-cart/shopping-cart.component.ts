import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup } from '@angular/forms';
import { Product } from 'src/model/product';
import { CartService } from '../_services/cart.service';
import { Scope } from 'eslint-scope';
import * as $ from "jquery";
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  UserLG : string='';
  TotalBuy:number = 0;
  public totalItem : number = 0;
  currentUser: any;
  formValue!: FormGroup;
  productModelObj: Product = new Product();
  public products : any = [];//lấy item của Addtocart();
  public grandTotal !: number;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private formBuilder:FormBuilder , private pds:ProductService,private cartService : CartService
  ) {this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit(): void {
      this.cartService.getProducts1()
      .subscribe(res=>{
      this.totalItem = res.length;
    })
      this.cartService.getProducts1()
      .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.TotalBuy = this.grandTotal+20;
    })
  }
  pushtobill()
  {
    localStorage.setItem('bill',JSON.stringify(this.products));
  }
  buyInfo(){

  }
  //--------------Thông báo đã mua hàng --------------
  buyAlt(){
    alert("Thank you !");
    window.location.replace("/home");
  }
  //----------------Lấy user đã đăng nhập -------------
  getUser(){
      this.UserLG =this.currentUser.username;
      return this.UserLG;
  }
  //----------------Xóa item khỏi giỏ hàng ----------


  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  
  //-----------------logout--------------
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
  reload_page()
    {
      location.reload();
    }

}


