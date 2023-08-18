import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService) { 
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
    } catch (error) {
      // Error handling is done in the AuthService, no need for extra handling here
    }
}

    // Auth logic to run auth providers

}
