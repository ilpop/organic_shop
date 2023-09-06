import { User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: User) {}
  /*{
    this.db.object('/users/' + user.uid).update({
      email: user.email
    });*/
}
