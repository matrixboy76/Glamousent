import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, first, flatMap } from 'rxjs/operators';
import { Product } from 'src/model/product';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient
    ) { }
  createProducts(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{return res;}))
  }
  getProduct(): Observable<Product[]>//Lấy sản phẩm FEATURED
  {
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{return res;}))
  }
  getProductById(id: number) : Observable<Product>//product Detail
  {
    return this.getProduct().pipe(flatMap(result => result), first(product => product.id == id));
  }
  updateProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{return res;}))
  }
  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{return res;}))
  }
}
