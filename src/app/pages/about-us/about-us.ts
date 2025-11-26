// about-us.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-us',  // Update selector
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css'],
})
export class AboutUsComponent {  // Rename class to AboutUsComponent
  contactForm: FormGroup;
  formStatus: string = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get isValid() {
    return this.contactForm.valid;
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.formStatus = 'Form submitted successfully!';
      this.contactForm.reset();
    } else {
      this.formStatus = 'Please fill all required fields correctly.';
    }
  }
}
