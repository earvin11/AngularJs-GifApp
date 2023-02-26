import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  // con el decorador ViewChild busca en el html un elemento con la ref txtSearch y crea una prop en la class
  @ViewChild('txtSearch')
  txtSearch!: ElementRef<HTMLInputElement>

  constructor(
    private gifsService: GifsService,
  ) {}

  search() {
    const value = this.txtSearch.nativeElement.value;

    if(!value.trim().length) return;
    
    // inserta el termino de busqueda en el history
    this.gifsService.searchGifs( value );

    this.txtSearch.nativeElement.value = ''
  }
}
