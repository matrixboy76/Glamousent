import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')||'{}'));//khi login thành công sẽ lấy về 1 currentUser ( đại diện cho user đã đăng nhập)
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    loginuser(username: any, password: any) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
        //gửi dữ liệu lên 'users/authenticate' , pipe giúp chuyển đổi dữ liệu , map biến dữ liệu thô đưa vào thành kiểu JSON (key-value)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));//tạo ra biến currentUser chứa dữ liệu(user) đc chuyển tới(key-value).
                //sửa lại localstorage
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    loginadmin(username: any, password: any){
            return  this.http.post<any>(`/admin/authenticateadmin`, { username, password })
            .pipe(map(admin => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(admin));//biến currentUser chứa chuỗi (user) đc chuyển đổi từ đối tượng user
                //sửa lại localstorage
                this.currentUserSubject.next(admin);
                return admin;
          }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
