import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.showSnackBar('Registration successful');
    } catch (error) {
      console.error('Error during registration:', error);
      this.showSnackBar('Registration failed. Please try again.', 'error');
    }
  }

  async login(email: string, password: string) {
    try {
      let returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      localStorage.setItem('returnUrl', returnUrl);
      
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.showSnackBar('Login successful');
    } catch (error) {
      console.error('Error during login:', error);
      this.showSnackBar('Login failed. Please try again.', 'error');
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.showSnackBar('Logout successful');
  }

  private showSnackBar(message: string, panelClass: string = 'success') {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass,
    });
  }

  get user() {
    return this.afAuth.user;
  }

}  

