import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';



export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getCategories(){

  }
}
