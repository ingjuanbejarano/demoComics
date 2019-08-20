import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  allComics = [];
  private favSubscription: Subscription;

  constructor(private storeSrv: StoreService) {}

  ngOnInit() {
    this.getComics();
  }

  ngOnDestroy() {
    this.favSubscription.unsubscribe();
  }

  getComics() {
    this.favSubscription = this.storeSrv.getData().subscribe(data => {
      data.forEach(doc => {
        this.allComics.push({
          id: doc.payload.doc.id,
          info: doc.payload.doc.data()
        });
      });
    });
  }

  deleteFav(id: string) {
    this.allComics = [];
    this.storeSrv.deleteFav(id).catch(error => {
      alert(error.message);
    });
  }
}
