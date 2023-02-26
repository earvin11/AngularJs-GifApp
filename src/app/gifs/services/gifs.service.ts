import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'bj7J3Y9v9iQT4VsVFI6yvGVLF62J52D8';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history(): string[] {
    return [ ...this._history ];
  }

  constructor(
    // HttpClient es un provider para manejar peticiones que viene de HttpClientModule
    private http: HttpClient
  ) {
    this._history = JSON.parse( localStorage.getItem('history')! ) || [];
    this.results = JSON.parse( localStorage.getItem('results')! ) || [];
    // if( localStorage.getItem('history') ) {
    //   this._history = JSON.parse( localStorage.getItem('history')! );
    // }

  }

  searchGifs( query: string ) {

    query = query.trim().toLowerCase();

    // si el query no existe dentro del history guardalo
    if( !this._history.includes(query) ) {
      this._history.unshift(query);
      // corta el history para que solo esten los ultimos 10
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify( this._history ));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( (resp) => {
        // console.log(resp.data);
        this.results = resp.data;

        localStorage.setItem('results', JSON.stringify( this.results ));
      });

  }
}
