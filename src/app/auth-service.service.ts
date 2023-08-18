import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private snackBar: MatSnackBar) {}

  async register(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      this.showSnackBar('Registration successful');
    } catch (error) {
      console.error('Error during registration:', error);
      this.showSnackBar('Registration failed. Please try again.', 'error');
    }
  }

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.showSnackBar('Login successful');
    } catch (error) {
      console.error('Error during login:', error);
      this.showSnackBar('Login failed. Please try again.', 'error');
    }
  }

  async logout() {
    await this.auth.signOut();
    this.showSnackBar('Logout successful');
  }

  private showSnackBar(message: string, panelClass: string = 'success') {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass,
    });
  }

  get user() {
    return this.auth.user;
  }
}

