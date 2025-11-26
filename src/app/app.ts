// File: src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { BotpresschatComponent } from './pages/botpresschat/botpresschat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    BotpresschatComponent  // <-- include your Botpress component here
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
