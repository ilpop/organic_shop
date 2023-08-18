import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { User } from 'firebase/auth';


@Component({
  selector: ' bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: User | undefined;


  constructor(private auth: AuthService) { 
    this.auth.user.subscribe((user) => {
    this.user$ = user;
  });
}

  logout() {
    this.auth.logout();
  }
}
