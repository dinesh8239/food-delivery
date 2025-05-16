import { Component } from '@angular/core';
import { AuthService } from '../services/auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './loign.component.html',
  styleUrls: ['./loign.component.css'],
  standalone: true
})
export class LoignComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login success:', res);

        const role = res?.data?.user?.role

        // Save token/user info if needed
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'user') {
          this.router.navigate(['']); // change '/home' to your main page
        } else {
          console.warn('Unknown role:', role);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }

}
