import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  errorMessage: string = '';
  searchQuery: string = '';
  iframeUrl: SafeResourceUrl | null = null;
  @Output() iframeUrlChange = new EventEmitter<SafeResourceUrl | null>();
  

  @ViewChild('searchID')
  searchInput!: ElementRef;
  

  constructor(private sanitizer: DomSanitizer) { }

  search() {
    this.errorMessage='';
    if (this.searchQuery.trim() === '') {
      return;
    } else{
    const apiKey = 'fc49c4e4';
       
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(this.searchQuery)}&apikey=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const imdbID = data.imdbID;
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:4201/${imdbID}`);
          this.iframeUrlChange.emit(this.iframeUrl);
          
        } else {
          this.errorMessage = 'Movie not found';
          this.iframeUrl=null;
          this.iframeUrlChange.emit(this.iframeUrl);
          this.clearSearch();
        }
      })
      .catch(error => {
        
        this.errorMessage='Error fetching data: ' + error;
        this.iframeUrl=null;
        this.iframeUrlChange.emit(this.iframeUrl);
        this.clearSearch();
      });
  }
}
  clearSearch() {
    this.searchQuery='';
    this.searchInput.nativeElement.value = '';
  }

}
