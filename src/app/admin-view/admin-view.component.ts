import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { Product } from 'src/model/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'
import { data } from 'jquery';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  countuser:number = 0;
  countadmin : number = 1;
  currentUser: any;
  UserLG : string='';
  formValue!: FormGroup;
  productModelObj: Product = new Product();
  productData!:any
  userData!:any
  adminData!:any
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private formBuilder:FormBuilder , private pds : ProductService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.countuser = JSON.parse(localStorage.getItem('users')||'{}').length;
    
    
    //lấy độ dài của mảng users trong localstorage để trả về số lượng user
    this.userData =  JSON.parse(localStorage.getItem('users')||'{}'); 

    //load data user từ localStorage về .
    this.countadmin = JSON.parse(localStorage.getItem('admin')||'{}').length;
    this.adminData = JSON.parse(localStorage.getItem('admin')||'{}');
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Id :[''],
      Title : [''],
      Price :[''],
      Image :[''],
      Gender:['']
    })
    this.getAllproduct();
  }

  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }

  postProductDetails(){
    this.productModelObj.title = this.formValue.value.Title;
    this.productModelObj.price = this.formValue.value.Price;
    this.productModelObj.image = this.formValue.value.Image;
    this.productModelObj.gender = this.formValue.value.Gender;
    this.pds.createProducts(this.productModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Successfully")
      this.formValue.reset();
      this.getAllproduct();
    },
      err=>{alert("ERROR");})
  }

  getAllproduct(){
    this.pds.getProduct()
    .subscribe(res => {this.productData = res})
  }


  deletePD(pr:any){
    this.productModelObj.id = pr.id;
    this.pds.deleteProduct(this.productModelObj.id)
    .subscribe(res=>{alert("deleted!");
    this.getAllproduct();
  })
  }

  updatePD(){
    this.productModelObj.id= this.formValue.value.Id ;
    this.productModelObj.title=this.formValue.value.Title;
    this.productModelObj.price=this.formValue.value.Price;
    this.productModelObj.image=this.formValue.value.Image;
    this.productModelObj.gender=this.formValue.value.Gender;
    this.pds.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe(res=>{alert("update successfully!");
    this.formValue.reset();
    this.getAllproduct();
  })
  }



  deleteuser(user:any)
  {
    const items = JSON.parse(localStorage.users);
    const items1 = items.filter(item => item.id !== user.id);
    localStorage.setItem('users', JSON.stringify(items1));
    location.reload();
  }
  deleteadmin(admin:any)
  {
    const items2 = JSON.parse(localStorage.admin);
    const items3 = items2.filter(item1 => item1.id !== admin.id);
    localStorage.setItem('admin', JSON.stringify(items3));
    location.reload();
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['']);
  }
  reload_page()
  {
    location.reload();
  }

}

