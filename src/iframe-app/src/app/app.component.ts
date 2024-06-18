import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getImdbIDFromUrl(): string | undefined {
    const url = window.location.href;
    const imdbID = url.split('/').pop(); // Assuming last part of URL is imdbID
    return imdbID;
  }
}
