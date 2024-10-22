import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'share-lazy-images',
  templateUrl: './lazy-images.component.html',
  styleUrl: './lazy-images.component.css'
})
export class LazyImagesComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  private hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required.');
  }
}
