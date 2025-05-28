import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule,RouterLink]
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  orderType: 'delivery' | 'dine-in/takeaway' = 'delivery'; // new variable
  constructor(private cartService: CartService, private router: Router, private http: HttpClient) { }
  // constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // Load orderType from localStorage or default
    const savedType = localStorage.getItem('orderType');
    this.orderType = savedType === 'dine-in/takeaway' ? 'dine-in/takeaway' : 'delivery';

    // Subscribe to cart count
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.cartService.refreshCartCount();
  }

  // Handle order type toggle
  toggleOrderType(event: any) {
    const apiUrl=
    this.orderType = event.target.checked ? 'dine-in/takeaway' : 'delivery';
    localStorage.setItem('orderType', this.orderType);
    location.reload(); // Reload the page to apply the new order type
    

  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

   fetchCategories(): void {
    this.http
      .get<any>(`http://localhost:5000/api/food-categories?orderType=${this.orderType}`)
      .subscribe((res: any) => {
        this.orderType = res.data;
      });
  }
}
