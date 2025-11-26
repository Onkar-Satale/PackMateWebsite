import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Notification variables
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(private router: Router) {}

  handleSignup(event: Event) {
    event.preventDefault();

    if (!this.email || !this.password || !this.confirmPassword) {
      this.showNotification("Please fill all fields", 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showNotification("Passwords do not match", 'error');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(user => user.email === this.email)) {
      this.showNotification("User already exists", 'error');
      return;
    }

    users.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    this.showNotification("Signup successful! Please login.", 'success');
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000);
  }
}
