import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';  // adjust path as needed
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // corrected 'styleUrl' to 'styleUrls'
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to cart count updates
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Initial fetch
    this.cartService.refreshCartCount();
    
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
