import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: '/',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

  
})


export class HomeComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]> | undefined;
  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

}
