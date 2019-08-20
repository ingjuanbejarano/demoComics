import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnDestroy {

  private userId: string;
  private userSub: Subscription;
  constructor(private afs: AngularFirestore, private authSrv: AuthService) {
    this.userSub = this.authSrv.user$.subscribe( u => {
      this.userId = u.uid;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  public getData() {
    return this.afs.collection(this.userId).snapshotChanges();
  }

  public putFav(comic) {
    return this.afs.collection(this.userId).add({
      infoComic: comic
    });
  }

  public deleteFav(id) {
    return this.afs.collection(this.userId).doc(id).delete();
  }
}
