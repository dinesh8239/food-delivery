import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  deliveryAddress: string = '';
  paymentMethod: string = 'cash';
  cart: any = null;
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchCart();
    this.fetchOrders();
  }

  fetchCart() {
    this.cartService.getCartStatus().subscribe({
      next: (res: any) => {
        this.cart = res?.data || null;
      },
      error: (err: any) => {
        console.error("Error fetching cart", err);
        this.cart = null;
      }
    });
  }

  placeOrder() {
    if (!this.cart || this.cart.items.length === 0) {
      return alert("Cart is empty.");
    }

    const orderData = { deliveryAddress: this.deliveryAddress, paymentMethod: this.paymentMethod };
    this.orderService.placeOrder(orderData).subscribe({
      next: () => {
        alert("Order placed successfully!");
        this.deliveryAddress = '';
        this.paymentMethod = 'cash';
        this.fetchOrders();
        this.fetchCart(); // Refresh cart after placing order
      },
      error: (err: any) => {
        console.error(err);
        alert("Failed to place order.");
      }
    });
  }

  fetchOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {
        this.orders = res?.data || [];
      },
      error: (err) => {
        console.error("Error fetching orders", err);
      }
    });
  }

  // cancelOrder(orderId: string) {
  //   if (!confirm("Are you sure you want to cancel this order?")) return;

  //   this.orderService.cancelOrder(orderId).subscribe({
  //     next: () => {
  //       alert("Order cancelled.");
  //       this.fetchOrders();
  //     },
  //     error: (err) => {
  //       console.error("Cancel failed", err);
  //       alert("Failed to cancel order.");
  //     }
    // });
  }
// }
