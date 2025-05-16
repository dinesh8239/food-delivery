import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  // Place a new order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/place`, orderData);
  }

  // Get all orders of the current user
  getMyOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/my`);
  }

  // Get a specific order by ID
  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${orderId}`);
  }
}
