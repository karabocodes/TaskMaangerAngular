import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<any>(null);

  isLoggedIn = computed(() => !!this.currentUserSignal());
  isAdmin = computed(() => this.currentUserSignal()?.role === 'admin');

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSignal.set(user);
  }

  login(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  getCurrentUser() {
    return this.currentUserSignal();
  }
}