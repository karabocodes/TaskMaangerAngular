import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule // Import MatPaginatorModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTasks: number = 0;
  users: any[] = [];
  tasks: { priority: string; categories: string[] }[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.users); // MatTableDataSource for paginator
  editingUser: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for paginator

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Assign paginator after view initialization
  }

  loadDashboardData() {
    this.apiService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
        this.totalUsers = users.length;
        this.dataSource.data = users; // Update dataSource data
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );

    this.apiService.getAllTasks().subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
        this.totalTasks = tasks.length;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  startEditing(user: any) {
    this.editingUser = { ...user };
  }

  cancelEditing() {
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser.id) {
      this.apiService.updateUser(this.editingUser.id, this.editingUser).subscribe(
        () => {
          this.loadDashboardData();
          this.editingUser = null;
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe(
        () => {
          this.loadDashboardData();
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}
