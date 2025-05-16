import { Component } from '@angular/core';
import { AuthService } from '../services/auth.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Registration success:', res);
        this.router.navigate(['/login']);

        
      },
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
  }
}
