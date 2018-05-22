import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider 
{
  constructor(public http: HttpClient) 
  {
  }
  
  getProduct(pID :number)
  {
    var productLink = 'https://kolonial.no/api/v1/products/' + pID + '/';

    //Reddit version
    return new Promise((resolve, reject) => 
    {
      this.http.get(productLink)
        .subscribe(
        (resp) => 
        {
          resolve(resp);
        },
        (error) => 
        {
          reject(error);
        });
    });
  }
}