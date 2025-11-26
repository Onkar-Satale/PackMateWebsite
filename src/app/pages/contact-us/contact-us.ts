import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  formStatus: string = '';
  isValid: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.contactForm.invalid) {
      this.isValid = false;
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.value;
    const payload = {
      access_key: '80b522a5-af83-42c3-bd69-801db9beaf63',
      subject: 'New Submission from Web3Forms',
      ...formData
    };

    this.formStatus = 'Sending message...';

    this.http.post('https://api.web3forms.com/submit', payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    }).subscribe({
      next: (res: any) => {
        this.formStatus = 'Message sent successfully!';
        this.isValid = true;
        this.contactForm.reset();
        setTimeout(() => this.formStatus = '', 5000);
      },
      error: (err) => {
        console.error(err);
        this.formStatus = 'Something went wrong!';
        setTimeout(() => this.formStatus = '', 5000);
      }
    });
  }
}
