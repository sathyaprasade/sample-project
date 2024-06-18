import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  @Input() imdbID: string | undefined;
  movieInfo: any;

  constructor() { }

  ngOnInit(): void {
    if (this.imdbID) {
      const apiKey = 'fc49c4e4';
      const apiUrl = `http://www.omdbapi.com/?i=${this.imdbID}&apikey=${apiKey}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.movieInfo = data;
        })
        .catch(error => {
          console.error('Error fetching movie info:', error);
        });
    }
  }
}
