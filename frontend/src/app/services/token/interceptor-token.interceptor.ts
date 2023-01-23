import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class InterceptorTokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){

    const token = this.loginService.getToken();
    let request: HttpRequest<any> = req;

    if(token && !this.loginService.TokenExpired(token)){
      request = req.clone({
        headers: req.headers.set('Authorization',  `Bearer ${token}`)
      })
    }// retorno o request com o erro tratado
    return next.handle(request)
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Erro front-end
    console.error('Ocorreu um erro:', error.error.message);
  } else {
    // Erro retornando pelo backend
    console.error(
      `Código do erro ${error.status}, ` +
      `Erro: ${JSON.stringify(error.error)}`);
  }
  
  return throwError('Ocorreu um erro, tente novamente');
}
}
