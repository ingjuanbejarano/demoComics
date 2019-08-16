import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComicsApiService {
  private PUBLIC_KEY = '35f2961520cd3bf2b95c426db6295f66';
  private HASH = 'c1027581a995cfc80804b45f4cf41151';
  private COMPLETE_KEY = `ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
  private COMICS_URL = `http://gateway.marvel.com/v1/public/comics?${this.COMPLETE_KEY}`;

  constructor(private http: HttpClient) { }

  getAllComics(): Observable<any> {
    return this.http.get<any>(this.COMICS_URL)
      .pipe(map((data: any) => data.data.results));
  }

}
