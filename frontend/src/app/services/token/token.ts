import {Injectable} from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';


const KEY ='authtoken';
@Injectable({
    providedIn: 'root'
  })
export class TokenService{
    hasToken(){
        return this.getToken();

    }
    setToken(token: string | string){
        window.localStorage.setItem(KEY, token);
    }

    getToken(){
        window.localStorage.getItem(KEY);
    }

    removeToken(){
        window.localStorage.removeItem(KEY);
    }
}