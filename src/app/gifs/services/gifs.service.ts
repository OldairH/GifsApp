import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  // private apiKey: string = 'ofoMBCQwW6PR3M2CiTcD74ybT5BJA9kS';
  private  apiKey: string = 'uMfrknkehOs9ffcxMNAExHK6sb3QIw0L';
  private apiLimit: number = 10;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  private organizeHistory(tag: string): void {
    tag =tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if ( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if ( this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

   searchTag(tag:string): void {
    if (tag.length === 0 ) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.apiLimit)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{ params })
      .subscribe(response => {

        this.gifList = response.data;
        console.log(this.gifList)

      } )
  }


}
