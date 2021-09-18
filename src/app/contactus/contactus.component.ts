import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  currentUser: any;
  UserLG :string ='';
  temp:string='';
  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(){
  }
    //Lấy username đã đăng nhập
  getUser(){
    this.UserLG =this.currentUser.username;
    return this.UserLG;
  }
  sliceUser()
  {
    this.temp = this.UserLG;
    return this.temp.slice(4);//user + ... lấy tất cả ký tự từ ký tự thứ 4 (các ký tự ngoài chữ user)
  }
}
