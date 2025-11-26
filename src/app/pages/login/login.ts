import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  // Notification variables
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(private router: Router) {}

  handleLogin(event: Event) {
    event.preventDefault();

    if (!this.email || !this.password) {
      this.showNotification('Please fill both fields', 'error');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === this.email && u.password === this.password);

    if (user) {
      localStorage.setItem('loggedInUser', this.email);
      this.showNotification('Login successful!', 'success');

      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      setTimeout(() => {
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectUrl;
        } else {
          this.router.navigate(['/how-it-works']);
        }
      }, 1500);
    } else {
      this.showNotification('Incorrect email or password', 'error');
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000); // Auto-hide after 3 seconds
  }
}
