import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  vegFoods: any = [];
  category: string = 'veg';
  quantities: { [foodId: string]: number } = {};  // Track per item quantity

  constructor(
    private pro: ProductApiService,
    private ac: ActivatedRoute,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.ac.params.subscribe(param => {
      this.category = param['id'] || 'veg';
    });

    this.getCart();
    this.fetchVegFoods();
  }

  fetchVegFoods(): void {
    this.pro.getProduct(this.category).subscribe({
      next: (res) => {
        this.vegFoods = res.foods;
        console.log(this.vegFoods);
      },
      error: (err) => {
        console.log('Fetching data failed', err);
      }
    });
  }

  getCart(): void {
    this.cart.getCartStatus().subscribe(res => {
      console.log('Cart:', res);

      // Initialize quantities from the cart if needed
      if (res?.items) {
        res.items.forEach((item: any) => {
          this.quantities[item.food._id] = item.quantity;
        });
      }
    });
  }

  addToCart(foodId: string): void {
    this.quantities[foodId] = (this.quantities[foodId] || 0) + 1;
    this.updateCart(foodId);
  }

  increment(foodId: string): void {
    this.quantities[foodId] = (this.quantities[foodId] || 0) + 1;
    this.updateCart(foodId);
  }

  decrement(foodId: string): void {
    if (this.quantities[foodId] > 0) {
      this.quantities[foodId] -= 1;
      this.updateCart(foodId);
    }
  }

  updateCart(foodId: string): void {
    const quantity = this.quantities[foodId];
    this.cart.updateState(foodId, quantity).subscribe({
      next: (res) => {
        console.log('Cart updated:', res);
        this.getCart();
      },
      error: (err) => {
        console.log('Failed to update cart', err);
      }
    });
  }
}

