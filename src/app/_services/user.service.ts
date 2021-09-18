import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`/users`);
    }

    register(user: any) {
        return this.http.post(`/users/register`, user);
        //endpoint:'/users/register' dữ liệu từ component được lưu tại đây
        //cái này không liên quan đến đăng ký chỉ là khi ấn nút đăng ký nó sẽ gửi dữ liệu tới endpoint này
        //chuyển hướng đến endpoint 'users/register' để thực hiện hàm register() (ở fake-backend)
    }

    delete(id: any) {
        return this.http.delete(`/users/${id}`);
    }

}
