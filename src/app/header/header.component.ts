import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  searchValue!:FormGroup;
  currentUser: any;
  temp:string='';
  public productList : any ;
  UserLG :string ='';
  public totalItem : number = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private cartService : CartService,
    private pds:ProductService
  )
  {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}
  ngOnInit(): void {
    this.pds.getProduct()
      .subscribe(res=>{
      this.productList = res;
    this.cartService.getProducts1()
      .subscribe(res=>{
      this.totalItem = res.length;
      })
    })
  }
  //chuyển đến trang login
  login() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  //chuyển đến trang đăng ký
  createAcc(){
    this.authenticationService.logout();
    this.router.navigate(['/register']);
  }
  //Lấy username đã đăng nhập
  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }
  sliceUser()
  {
    this.temp = this.UserLG;
    return this.temp.slice(5);
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
