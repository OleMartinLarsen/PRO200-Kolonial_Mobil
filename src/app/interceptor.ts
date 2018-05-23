import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor 
{
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
 {     
    const dupReq = req.clone(
        { 
            headers: req.headers.set('Accept', 'application/json') //???
            .set('Content-Type', 'application/json')
            .set('User-Agent', 'WACTGruppe9_Test')
            .set('X-Client-Token', 'DI7j3Uw2Kx86brf4gf2qBBhIDn6MyumNjEGfFm5eZ7XallkQPv')
        });
    return next.handle(dupReq);
 }
};

@NgModule({
    providers: [
    { 
        provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true 
    }]
})

export class InterceptorModule
{}