import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ComicsApiService } from '../../services/comics-api.service';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  idComics = [];
  allComics: Observable<any>;
  private userFavs: Subscription;
  constructor(private comicSrv: ComicsApiService, private storeSrv: StoreService) {
  }

  ngOnInit() {
    this.userFavs = this.storeSrv.getData().subscribe(a => {
      a.forEach(b => {
        this.idComics.push(b.payload.doc.data().infoComic.id);
      });
    });
  }

  ngAfterViewInit() {
    this.allComics = this.comicSrv.getAllComics();
  }

  ngOnDestroy() {
    this.userFavs.unsubscribe();
  }

  guardarFavorito(comic) {
    if (this.verificarComic(comic.id)) {
      alert('Ya existe este comic en tu lista de favoritos');
    } else {
      this.storeSrv.putFav(comic).then(() => {
        alert('Comic agregado a tu biblioteca de favoritos');
      }).catch(error => {
        alert(error.message);
      });
    }
  }

  verificarComic(id) {
    return this.idComics.some(idC => idC === id);
  }
}
