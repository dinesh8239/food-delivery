import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {
  vegFoods: any[] = [];
  category: string = 'veg';
  quantities: { [foodId: string]: number } = {};

  constructor(
    private pro: ProductApiService,
    private ac: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngAfterViewInit(): void {
    this.ac.params.subscribe(param => {
      this.category = param['id'] || 'veg';
      this.fetchVegFoods();
    });
  }

  ngOnInit(): void {
    this.ac.params.subscribe(param => {
      this.category = param['id'] || 'veg';
      this.fetchVegFoods();
    });

    this.getCart();
  }

  fetchVegFoods(): void {
    this.pro.getProduct(this.category).subscribe({
      next: (res) => {
        this.vegFoods = res.foods;
        this.updateDisplayedQuantities(); // Sync quantity on product list
      },
      error: (err) => {
        console.error('Fetching foods failed', err);
      }
    });
  }

  getCart(): void {
    this.cartService.getCartStatus().subscribe({
      next: (res: any) => {
        const items = res?.data?.items || [];
        this.quantities = {};
        items.forEach((item: any) => {
          this.quantities[item.food._id] = item.quantity;
        });
        this.updateDisplayedQuantities(); // also refresh UI here
      },
      error: (err) => console.error('Cart fetch error', err)
    });
  }

  addToCart(food: any): void {
    const foodId = food._id;
    const newQuantity = 1;
    this.quantities[foodId] = newQuantity;

    this.cartService.updateState(foodId, newQuantity).subscribe({
      next: () => {
        this.getCart();
        this.cartService.refreshCartCount(); // ✅ update navbar cart count
      },
      error: (err) => console.error('Add to cart failed', err)
    });
  }

  increment(food: any): void {
    const foodId = food._id;
    const newQuantity = (this.quantities[foodId] || 0) + 1;
    this.quantities[foodId] = newQuantity;

    this.cartService.updateState(foodId, newQuantity).subscribe({
      next: () => {
        this.getCart();
        this.cartService.refreshCartCount(); // ✅ update navbar cart count
      },
      error: (err) => console.error('Increment error:', err)
    });
  }

  decrement(food: any): void {
    const foodId = food._id;
    const currentQuantity = this.quantities[foodId] || 0;

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      this.quantities[foodId] = newQuantity;

      this.cartService.updateState(foodId, newQuantity).subscribe({
        next: () => {
          this.getCart();
          this.cartService.refreshCartCount(); // ✅ update navbar cart count
        },
        error: (err) => console.error('Decrement error:', err)
      });
    } else if (currentQuantity === 1) {
      delete this.quantities[foodId];
      this.cartService.removeFromCart(foodId).subscribe({
        next: () => {
          this.getCart();
          this.cartService.refreshCartCount(); // ✅ update navbar cart count
        },
        error: (err) => console.error('Remove error:', err)
      });
    }
  }

  updateDisplayedQuantities(): void {
    this.vegFoods.forEach(food => {
      food.quantity = this.quantities[food._id] || 0;
    });
  }
}
