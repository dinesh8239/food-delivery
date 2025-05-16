import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  orders: any[] = [];
  foods: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOrders();
    this.loadFoods();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res) => this.users = res?.users || [],
      error: (err) => console.error('Error loading users:', err)
    });
  }

  deleteUser(id: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u._id !== id);
        alert('User deleted');
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

  loadOrders(): void {
    this.adminService.getAllOrders().subscribe({
      next: (res) => this.orders = res?.orders || [],
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  updateStatus(orderId: string, status: string): void {
    this.adminService.updateOrderStatus(orderId, { status }).subscribe({
      next: () => {
        alert('Order status updated');
        this.loadOrders();
      },
      error: (err) => console.error('Status update failed:', err)
    });
  }

  loadFoods(): void {
    this.adminService.getAllFoods().subscribe({
      next: (res) => this.foods = res?.foods || [],
      error: (err) => console.error('Error loading foods:', err)
    });
  }
}
