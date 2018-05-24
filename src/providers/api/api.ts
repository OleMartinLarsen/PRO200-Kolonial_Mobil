import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  results: any;
  rootUrl: string = "https://www.kolonial.no/api/v1/products/9329/";


  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getItem() {
    this.http.get(this.rootUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'WACTGruppe9_Test',
        'X-Client-Token': 'DI7j3Uw2Kx86brf4gf2qBBhIDn6MyumNjEGfFm5eZ7XallkQPv'
      })
    })
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.results = data;
        return this.results;
      });
  }
}
