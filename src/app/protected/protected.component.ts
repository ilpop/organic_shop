import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {

  constructor(public auth: AuthService) { }

  async logout() {
    try {
      await this.auth.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
