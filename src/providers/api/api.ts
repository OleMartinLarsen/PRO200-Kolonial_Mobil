import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

@Injectable()
export class ApiProvider 
{
  constructor(public http: HttpClient) 
  {
  }
  
  // getApi()
  // {
  //   let endPoint = 'https://kolonial.no/api/v1/products/9329/';
  //   let headersObj = new Headers({'Token':'BbG99xs8f8wHnXupMf0ow0NZhcOVPWCOa37GfaiQJ0Qtnk77Rf',
  //                                   'User-Agent': 'AlexanderTg_Test'});
    
  //   this.http.get(endPoint, Headers:headersObj)
  //   .map(res => 
  //     {
  //       console.log('res: ', res);
  //       if (res.status < 200 || res.status > 300) 
  //       {
  //         throw new Error("Error in your code with status" + res.status);
  //       }
  //       return res.json()
  //     })
  //     .catch(error =>
  //       console.log(error)
  //     );
  // }
}