import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.css']
})
export class HowItWorksComponent implements AfterViewInit {

  @ViewChild('introSection') introSection!: ElementRef;
  @ViewChild('detailsSection') detailsSection!: ElementRef;

  introVisible = false;
  detailsVisible = false;

  num1 = 0;  // for 95%
  num2 = 0;  // for 1000+

  coords: { latitude: number, longitude: number } | null = null;
  locationName = '';
  error = '';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const observerOptions = { root: null, threshold: 0.2 };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.introSection.nativeElement) {
            this.introVisible = true;
            this.animateNumbers();
          }
          if (entry.target === this.detailsSection.nativeElement) {
            this.detailsVisible = true;
          }
        }
      });
    }, observerOptions);

    observer.observe(this.introSection.nativeElement);
    observer.observe(this.detailsSection.nativeElement);

    // Start geolocation after view init
    this.fetchLocation();
  }

  animateNumbers() {
    const target1 = 95;
    const target2 = 1000;

    let current1 = 0;
    let current2 = 0;

    const interval1 = setInterval(() => {
      if (current1 < target1) {
        current1++;
        this.num1 = current1;
      } else clearInterval(interval1);
    }, 15);

    const interval2 = setInterval(() => {
      if (current2 < target2) {
        current2 += 10;
        this.num2 = current2 > target2 ? target2 : current2;
      } else clearInterval(interval2);
    }, 10);
  }

  handleTryNow() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const tryNowUrl = 'https://packmatewebsite-kutgdknwcseymqdedauuq8.streamlit.app';
    if (!loggedInUser) {
      localStorage.setItem('redirectAfterLogin', tryNowUrl);
      this.router.navigate(['/login']);
      return;
    }
    window.location.href = tryNowUrl;
  }

  fetchLocation() {
    if (!navigator.geolocation) {
      this.error = 'Geolocation not supported.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        this.coords = { latitude, longitude };
        try {
          const apiKey = 'baf9968e5b5b41e28025d2585658b52d';
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
          const data = await response.json();
          if (data?.results?.length > 0) this.locationName = data.results[0].formatted;
          else this.error = 'No location found.';
        } catch (err) {
          console.error(err);
          this.error = 'Failed to fetch location.';
        }
      },
      (err) => {
        this.error = 'Unable to retrieve location: ' + err.message;
      }
    );
  }
}
