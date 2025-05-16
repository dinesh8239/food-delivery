import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.component';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']

})
export class AddProductComponent {
  productForm: FormGroup;
  image: File | null = null;
  uploading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      // stock: ['', Validators.required],
      category: ['', Validators.required],
      // brand: ['', Validators.required],
      description: [''],
      image: [null]
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target?.files?.length) {
      this.image = target.files[0];
    }
  }

  async onSubmit() {
    if (!this.productForm.valid || !this.image) {
      alert('Please fill all fields and select an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    // formData.append('description', this.productForm.get('description')?.value);
    formData.append('image', this.image); // key must match multer config
  
    this.uploading = true;
  
    // Get token from localStorage (or from AuthService)
    const token = localStorage.getItem('token');
    console.log("Token being sent:", token); // Add this
      
    this.http.post('http://localhost:5000/api/food', formData).subscribe({
      next: (res) => {
        console.log('Product created:', res);
        alert('Product added successfully!');
        this.productForm.reset();
        this.image = null;
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product');
      },
      complete: () => {
        this.uploading = false;
      }
    });
    
  }
}