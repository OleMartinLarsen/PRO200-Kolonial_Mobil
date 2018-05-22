import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

@Injectable()
export class ApiProvider 
{
  constructor(public http: HttpClient) 
  {
  }
  
  getApi(pID :number)
  {
    let endPoint = 'https://kolonial.no/api/v1/products/' + pID + '/';
    
    this.http.get(endPoint)
    .map(res => 
      {
        console.log('res: ', res);
        return res;
      });

      //Reddit version
      return new Promise((resolve, reject) => 
      {
        this.http.get(endPoint)
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