import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/model/product';
@Component({
  selector: 'app-girl',
  templateUrl: './girl.component.html',
  styleUrls: ['./girl.component.css']
})
export class GirlComponent implements OnInit {
  public productList : any ;
  UserLG :string ='';
  temp:string='';
  currentUser: any;
  selectedProduct:Product = new Product();
  constructor(
    private router: Router,
    private pds:ProductService,
    private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.pds.getProduct()
    .subscribe(res=>{
    this.productList = res;
    this.productList.forEach((a:any) => {
    Object.assign(a,{quantity:1,total:a.price});
      });
    })
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
  onSelect(item:Product){
    this.selectedProduct = item;
    this.router.navigateByUrl("/home/productDetail/"+item.id)
  }
}
