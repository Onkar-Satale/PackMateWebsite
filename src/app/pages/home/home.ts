import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  // Sections
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featureSection') featureSection!: ElementRef;
  @ViewChild('scenarioSection') scenarioSection!: ElementRef;
  @ViewChildren('testimonialCard', { read: ElementRef }) testimonialCards!: QueryList<ElementRef>;

  // Visibility states
  heroVisible = false;
  featuresVisible = false;
  scenariosVisible = false;
  visibleTestimonials: number[] = [];

  // Images
  img1 = 'assets/img1.png';
  img2 = 'assets/img2.png';

  // Features
  features = [
    { title: 'Personalized Packing Suggestions', description: 'Our AI analyzes your travel details to provide a customized packing list.', img: 'assets/feature1.png' },
    { title: 'Weather-Based Recommendations', description: 'Stay prepared with real-time weather updates that adjust your packing list.', img: 'assets/feature2.png' },
    { title: 'Interactive Packing Experience', description: 'User-friendly interface with animations that make packing fun and efficient.', img: 'assets/feature3.png' },
    { title: 'Time-Saving', description: 'Save hours of planning with ready-to-use personalized lists.', img: 'assets/feature4.png' },
    { title: 'Smart AI Suggestions', description: 'Get intelligent packing recommendations based on destination, weather, and activities.', img: 'assets/feature5.png' },
    { title: 'Stress-Free Travel', description: 'Ensure you never forget essentials and travel worry-free.', img: 'assets/feature6.png' }
  ];

  // Scenarios
  scenarios = [
    { title: 'Beach Vacation', description: 'PackMate’s AI suggests light clothing, swimwear, and sun protection essentials for a perfect beach getaway.', img: 'assets/beach.png' },
    { title: 'Business Trip', description: 'For business travelers, PackMate recommends formal attire, tech gadgets, and travel-friendly accessories.', img: 'assets/business.png' },
    { title: 'Mountain Adventure', description: 'Heading to the mountains? Our AI suggests warm layers, skiing gear, and safety equipment.', img: 'assets/mountain.png' }
  ];

  // Users / Testimonials
  users = [
    { name: 'Emily', title: 'Investor', testimonial: 'PackMate has completely changed the way I prepare for trips! I never forget essentials anymore, and the suggestions are spot on.', img: 'assets/user1.png' },
    { name: 'Ace', title: 'Banker', testimonial: 'Using PackMate made my last vacation stress-free! The AI recommendations were tailored perfectly to my itinerary and the weather.', img: 'assets/user2.png' },
    { name: 'Ely', title: 'Traveler', testimonial: 'PackMate is a game changer! I love how it adapts to my travel style and makes packing so much easier.', img: 'assets/user3.png' }
  ];

  ngAfterViewInit(): void {
    // Hero Observer
    new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) this.heroVisible = true; });
    }, { threshold: 0.1 }).observe(this.heroSection.nativeElement);

    // Features Observer
    new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) this.featuresVisible = true; });
    }, { threshold: 0.1 }).observe(this.featureSection.nativeElement);

    // Scenarios Observer
    new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) this.scenariosVisible = true; });
    }, { threshold: 0.1 }).observe(this.scenarioSection.nativeElement);

    // Testimonials Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const index = this.testimonialCards.toArray().findIndex(c => c.nativeElement === entry.target);
        if (entry.isIntersecting && index !== -1 && !this.visibleTestimonials.includes(index)) {
          this.visibleTestimonials.push(index);
        }
      });
    }, { threshold: 0.2 });

    this.testimonialCards.forEach(card => observer.observe(card.nativeElement));
  }
}
