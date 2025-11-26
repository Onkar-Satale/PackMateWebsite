import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrls: ['./features.css']
})
export class FeaturesComponent implements AfterViewInit {

  @ViewChild('introSection1') introSection1!: ElementRef;
  @ViewChild('detailsSection') detailsSection!: ElementRef;
  @ViewChild('introSection2') introSection2!: ElementRef;

  introVisible = false;
  detailsVisible = false;

  num1 = 0;
  num2 = 0;

  img14 = 'assets/14.png';
  img15 = 'assets/15.png';
  img16 = 'assets/16.png';

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.introSection1.nativeElement) {
            this.introVisible = true;
            this.animateNumbers();
          } 
          else if (entry.target === this.detailsSection.nativeElement) {
            this.detailsVisible = true;
          } 
          else if (entry.target === this.introSection2.nativeElement) {
            this.introVisible = true;
          }
        }
      });
    }, { root: null, threshold: 0.1 });

    observer.observe(this.introSection1.nativeElement);
    observer.observe(this.detailsSection.nativeElement);
    observer.observe(this.introSection2.nativeElement);
  }

  animateNumbers() {
    const targetNum1 = 95;
    const targetNum2 = 1000;

    const step1 = (targetNum1 - this.num1) / 60;
    const step2 = (targetNum2 - this.num2) / 60;

    const interval = setInterval(() => {
      this.num1 = Math.min(this.num1 + step1, targetNum1);
      this.num2 = Math.min(this.num2 + step2, targetNum2);

      if (this.num1 >= targetNum1 && this.num2 >= targetNum2) {
        clearInterval(interval);
      }
    }, 16);
  }

  handleClick() {
    window.location.href = 'http://localhost:8501';
  }
}
