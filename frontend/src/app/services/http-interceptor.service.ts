import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConstants } from "../app-constants";
 
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
 
  constructor(public router: Router) {
  }
 
  //1.  No Errors
  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }
 
  //2. Sending an Invalid Token will generate error
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    req = req.clone(AppConstants.headerToken);
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        return throwError(alert("Sem autorização"));
      })
    )
  }
 
  intercept3(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    req = req.clone(AppConstants.headerToken);
 
    return next.handle(req).pipe(
      catchError((error) => {
 
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                this.router.navigateByUrl("/login");
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl("/login");
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        }
        else {
          console.error("Other Errors");
        }
 
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
 
      })
    )
  }
}