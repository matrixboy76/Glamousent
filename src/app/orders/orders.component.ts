import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { AuthenticationService } from '../_services';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUser!:any;
  UserLG : string='';
  constructor(
    private authenticationService :AuthenticationService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
  }
  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }
}
