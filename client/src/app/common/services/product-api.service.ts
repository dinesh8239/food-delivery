import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http:HttpClient) { }

  getProduct(api: string):Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/food?category=${api}`);
  }
}
