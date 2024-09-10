import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private apiService: ApiService, private router: Router, private snackbar: MatSnackBar) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isFormValid(): boolean {
    return this.username.length >= 3 &&
           this.email.includes('@') &&
           this.password.length >= 8 &&
           /[A-Z]/.test(this.password) &&
           /[0-9]/.test(this.password) &&
           /[!@#$%&*_-]/.test(this.password);
  }

  onSubmit() {
    if (this.isFormValid()) {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'user'
      };

      this.apiService.register(newUser).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.snackbar.open('Registration successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error', error);
          this.snackbar.open('An error occurred during registration', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      );
    } else {
      this.snackbar.open('Please fill in all required fields correctly', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}