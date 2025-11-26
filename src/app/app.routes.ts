import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works';
import { FeaturesComponent } from './pages/features/features';
import { ContactUsComponent } from './pages/contact-us/contact-us';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { BotpresschatComponent } from './pages/botpresschat/botpresschat';
import { AboutUsComponent } from './pages/about-us/about-us';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'about-us', component: AboutUsComponent },   // new route
  { path: 'features', component: FeaturesComponent },

  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'botpresschat', component: BotpresschatComponent },
  // fallback route
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
