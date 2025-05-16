import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports:[CommonModule]
})
export class CartComponent implements OnInit {
  cart: any = { items: [], totalPrice: 0 };

  constructor(
    private cartService: CartService,
    private router: Router // ✅ Inject Router
  ) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart() {
    this.cartService.getCartStatus().subscribe({
      next: (res) => {
        this.cart = res?.data || { items: [], totalPrice: 0 };
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  increment(foodId: string) {
    const item = this.cart.items.find((i: any) => i.food._id === foodId);
    if (item) {
      this.updateItem(foodId, item.quantity + 1);
    }
  }

  decrement(foodId: string) {
    const item = this.cart.items.find((i: any) => i.food._id === foodId);
    if (item && item.quantity > 1) {
      this.updateItem(foodId, item.quantity - 1);
    }
  }

  updateItem(foodId: string, quantity: number) {
    this.cartService.updateState(foodId, quantity).subscribe({
      next: () => {
        this.fetchCart();
        this.cartService.refreshCartCount(); // 🔁 update header count
      },
      error: (err) => console.error('Error updating item:', err)
    });
  }
  
  removeItem(foodId: string) {
    this.cartService.removeFromCart(foodId).subscribe({
      next: () => {
        this.fetchCart();
        this.cartService.refreshCartCount(); // 🔁 update header count
      },
      error: (err) => console.error('Error removing item:', err)
    });
  }

  // ✅ Navigate to OrdersComponent on "Place Order"
  goToOrders() {
    this.router.navigate(['/orders']);
  }
}
