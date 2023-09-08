import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
email: string;
password: string;

  constructor(private auth: AuthService) { }

  async register(email: string, password: string) {
    try {
      await this.auth.register(email, password);
    } catch (error) {
      // Error handling is done in the AuthService, no need for extra handling here
    }
  }
}

