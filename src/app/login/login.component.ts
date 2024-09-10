import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.length > 0) {
            const user = response[0];
            this.authService.login(user);
            
            this.snackbar.open('Login successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
    
            if (user.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/tasks']);
            }
          } else {
            this.snackbar.open('Invalid credentials', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        },
        (error) => {
          console.error('Login error', error);
          this.snackbar.open('An error occurred during login', 'Close', {
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