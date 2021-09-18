import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')||'{}') || [];// ||'{}'=> fix:"Type 'null' is not assignable to type 'string'.ts(2345) "
let admins = JSON.parse(localStorage.getItem('admin')||'{}') || [];
// lấy all dữ liệu của users ở localstorage về .
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/admin/authenticateadmin') && method === 'POST':
                    return authenticateadmin();
                case url.endsWith('/users/register') && method === 'POST'://bất kể url nào kết thúc = 'users/register' đều sẽ sử dụng phương thức post của localstorage
                    return register();//bất kỳ dữ liệu nào khi truy cập tới endpoint này sẽ thực hiện hàm register
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }
        function authenticateadmin() {
            const { username, password } = body;
            const admin = admins.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
            if (!admin) return error('Username or password is incorrect');
            return ok({
                id: admin.id,
                username:admin.username,
                firstName: admin.firstName,
                lastName: admin.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body
            //kiểm tra username không được bắt đầu bằng 'admin'
            if (admins.find(y => y.username.slice(0,5) === user.username.slice(0,5))) {
              return error('"'+user.username+'"' +' is start with admin')
            }
            //kiểm tra username không được trùng với username đã tạo
            if (users.find(x => x.username === user.username)) {
              return error('"' + user.username + '" is already taken' )
            }

            //+1 vào id khi đăng ký mới 1 user
            user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
            users.push(user);//them user moi vao array users lay ve
            localStorage.setItem('users', JSON.stringify(users));//update user len localStorage

            return ok();
        }

        // helper functions

        function ok(body?: { id: any; username: any; firstName: any; lastName: any; token: string; } | undefined) {
            return of(new HttpResponse({ status: 200, body }))
        }
        //Hàm gửi thông báo khi có lỗi
        function error(message) {
          return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
