import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://nagarroapi.onrender.com';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?username=${username}&password=${password}`);
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUserProfile(userId: number, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, profileData);
  }

  updateUserPassword(userId: number, passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/password`, passwordData);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getTasks(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks?userId=${userId}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, user);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, {
      "password": newPassword
    });
  }
}
