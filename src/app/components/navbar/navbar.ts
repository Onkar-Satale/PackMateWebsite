import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  navLinks = ['How it works', 'Features', 'About Us', 'Contact Us'];

  loginHover = false;
  linkHover: number | null = null;

  setLoginHover(state: boolean) {
    this.loginHover = state;
  }

  setLinkHover(index: number | null) {
    this.linkHover = index;
  }

  generatePath(text: string) {
    return '/' + text.toLowerCase().replace(/\s+/g, '-');
  }
}
