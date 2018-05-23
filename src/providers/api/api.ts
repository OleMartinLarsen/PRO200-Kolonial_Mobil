import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import apikeys from '../../app/apikeys';

@Injectable()
export class ApiProvider 
{
  private agent: string = apikeys.UserAgent;
  private token: string = apikeys.Token;

  constructor(public http: HttpClient) 
  {
  }
  
  getData()
  {
    return new Promise((resolve, reject) =>
    {
      //Headers 1 (seems to work)
      var headers = new Headers();
      headers.append("Accept",  "application/json");
      headers.append("Content-Type", "application/json");

      //"Usage"
      headers.append("User-Agent", this.agent);
      headers.append("X-Client-Token", this.token);
      let options = ({ headers: headers });

      //"Usage->Authentication" (probably not)
      // headers.append("Cookie", "sessionid=" + this.token);

      this.http.post("https://www.kolonial.no/api/v1/products/9329", options)
        .subscribe(
          (resp) => 
          { 
            console.log('getData: succ');
            resolve(resp);
          },
          (error) => 
          { 
            console.log('getData: failed');
            reject(error);
          });
      console.log("GetData end");
    });
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