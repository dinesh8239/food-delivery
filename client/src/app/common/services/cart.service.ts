import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshCartCount(); // Automatically load count on service init
  }

  getCartStatus(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/cart');
  }

  updateState(foodId: string, quantity: number): Observable<any> {
    const data = { foodId, quantity };
    return this.http.post('http://localhost:5000/api/cart/add', data);
  }

  removeFromCart(foodId: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/api/cart/remove/${foodId}`);
  }

  refreshCartCount(): void {
    this.getCartStatus().subscribe({
      next: (res) => {
        const count = res?.data?.items?.reduce(
          (acc: number, item: any) => acc + (item.quantity || 1), 0
        ) || 0;
        this.cartCountSubject.next(count);
      },
      error: () => {
        this.cartCountSubject.next(0);
      }
    });
  }

  incrementCartCount(by: number = 1): void {
    const current = this.cartCountSubject.value;
    this.cartCountSubject.next(current + by);
  }

  decrementCartCount(by: number = 1): void {
    const current = this.cartCountSubject.value;
    const newCount = Math.max(0, current - by);
    this.cartCountSubject.next(newCount);
  }
}
