import { Product } from './../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productList : any ;
  UserLG :string ='';
  temp:string='';
  currentUser: any;
  public totalItem : number = 0;
  @Input() product! :Product;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private pds:ProductService,
    private cartService : CartService,
    private authenticationService: AuthenticationService
    ) {
  }

  ngOnInit() : void {
    this.cartService.getProducts1()
    .subscribe(res=>{
    this.productList = res;
    this.productList.forEach((a:any) => {
      Object.assign(a,{quantity:1,total:a.price});
      });
    })
    this.cartService.getProducts1()
    .subscribe(res=>{
    this.totalItem = res.length;
    })
    let id =+ this.route.snapshot.params['id'];
    this.pds.getProductById(id).subscribe(result => this.product = result);
  }
  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }
  sliceUser(){
    this.temp = this.UserLG;
    return this.temp.slice(5);
  }
  addtocart(product:any){
    this.cartService.addtoCart(product);
  }
  reload_page()
  {
    location.reload();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
