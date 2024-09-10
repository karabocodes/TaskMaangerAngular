import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../services/api.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  userId: number;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService, 
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Task>([]);
  }
  
  ngOnInit() {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTasks() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.apiService.getTasks(currentUser.id).subscribe(
      (tasks: Task[]) => {
        console.log('Tasks loaded:', tasks);
        this.dataSource.data = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
        // Handle the error, e.g., display a user-friendly message
      }
    );
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateTask(result);
        } else {
          this.createTask(result);
        }
      }
    });
  }

  createTask(task: Task) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    task.userId = currentUser.id;
    this.apiService.createTask(task).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

  updateTask(task: Task) {
    this.apiService.updateTask(task.id, task).subscribe(
      (updatedTask) => {
        console.log('Task updated:', updatedTask);
        this.loadTasks();
      },
      (error) => {
        console.error('Error updating task', error);
      }
    );
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.apiService.deleteTask(taskId).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task', error);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}