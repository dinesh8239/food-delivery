import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://localhost:5000/api/admin'; // Update with your API endpoint

    constructor(private http: HttpClient) {}

    // Example method to get all users
    getAllUsers(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users`);
    }

    // Example method to delete a user by ID
    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/users/${userId}`);
    }

    // Example method to update order details
    getAllOrders(): Observable<any> {
        return this.http.get(`${this.baseUrl}/orders`);
    }

    updateOrderStatus(orderId: string, orderData: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/orders/${orderId}`, orderData);
    }

    getAllFoods(): Observable<any> {
        return this.http.get(`${this.baseUrl}/foods`);
    }
}