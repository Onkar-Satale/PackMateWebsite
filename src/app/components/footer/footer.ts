import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule], // ✅ This is necessary
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faInstagram, faLinkedin, faTwitter);
  }
}
