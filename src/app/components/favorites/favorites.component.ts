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
    this.favSubscription = this.storeSrv.getComicsFav().subscribe( comicSnapshot => {
      comicSnapshot.forEach( comicData => {
        this.allComics.push({
          id: comicData.id,
          info: comicData.data()
        });
      });
    });
  }

  deleteFav(id: string) {
    this.storeSrv.deleteFav(id).then(() => {
      window.location.reload();
    }).catch(error => {
      alert(error.message);
    });
  }
}
