import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'bj7J3Y9v9iQT4VsVFI6yvGVLF62J52D8';
  private _history: string[] = [];

  public results: any[] = [];

  get history(): string[] {
    return [ ...this._history ];
  }

  constructor(
    // HttpClient es un provider para manejar peticiones que viene de HttpClientModule
    private http: HttpClient
  ) {}

  searchGifs( query: string ) {

    query = query.trim().toLowerCase();

    // si el query no existe dentro del history guardalo
    if( !this._history.includes(query) ) {
      this._history.unshift(query);
      // corta el history para que solo esten los ultimos 10
      this._history = this._history.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=bj7J3Y9v9iQT4VsVFI6yvGVLF62J52D8&q=${ query }&limit=10`)
      .subscribe( (resp: any) => {
        console.log(resp.data);
        this.results = resp.data;
      });

  }
}
