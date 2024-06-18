import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iframeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  onIframeUrlChange(url: SafeResourceUrl | null) {
    this.iframeUrl = url;
  }
}
