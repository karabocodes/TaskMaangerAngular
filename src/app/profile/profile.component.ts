import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  };
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id) {
      this.apiService.getUser(currentUser.id).subscribe(
        (user) => {
          this.user = { ...this.user, ...user };
        },
        (error: any) => {
          console.error('Error loading user profile', error);
          this.showSnackBar('Error loading user profile');
        }
      );
    }
  }

  onSubmit() {
    this.apiService.updateUser(this.user.id, this.user).subscribe(
      (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.showSnackBar('Profile updated successfully');
      },
      (error: any) => {
        console.error('Error updating profile', error);
        this.showSnackBar('An error occurred while updating the profile');
      }
    );
  }

  onChangePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.showSnackBar('New passwords do not match');
      return;
    }

    this.apiService.changePassword(this.user.id, this.currentPassword, this.newPassword).subscribe(
      () => {
        this.showSnackBar('Password changed successfully');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      },
      (error: any) => {
        console.error('Error changing password', error);
        this.showSnackBar('An error occurred while changing the password');
      }
    );
  }

  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.apiService.deleteUser(this.user.id).subscribe(
        () => {
          localStorage.removeItem('currentUser');
          this.showSnackBar('Account deleted successfully');
          // Redirect to login page or home page
        },
        (error: any) => {
          console.error('Error deleting account', error);
          this.showSnackBar('An error occurred while deleting the account');
        }
      );
    }
  }

  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'current':
        this.hideCurrentPassword = !this.hideCurrentPassword;
        break;
      case 'new':
        this.hideNewPassword = !this.hideNewPassword;
        break;
      case 'confirm':
        this.hideConfirmPassword = !this.hideConfirmPassword;
        break;
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}