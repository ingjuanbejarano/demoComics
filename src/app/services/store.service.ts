import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private userId: string;
  constructor(private afs: AngularFirestore, private authSrv: AuthService) {
    authSrv.user$.subscribe( u => this.userId = u.uid);
  }

  public putFav(comic) {
    return this.afs.collection(this.userId).add({
      infoComic: comic
    });
  }
  public getComicsFav() {
    return this.afs.collection(this.userId).get();
  }

  public deleteFav(id) {
    return this.afs.collection(this.userId).doc(id).delete();
  }
}
