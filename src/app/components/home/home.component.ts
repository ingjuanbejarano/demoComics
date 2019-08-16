import { Component, OnInit } from '@angular/core';
import { ComicsApiService } from '../../services/comics-api.service';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private comicSrv: ComicsApiService, private storeSrv: StoreService) { }

  allComics: Observable<any>;

  ngOnInit() {
    this.getComics();
  }

  getComics() {
    this.allComics = this.comicSrv.getAllComics();
  }

  guardarFavorito(comic) {
    this.storeSrv.putFav(comic).then(() => {
      alert('Comic agregado a tu biblioteca de favoritos');
    }).catch(error => {
      alert(error.message);
    });
  }
}
