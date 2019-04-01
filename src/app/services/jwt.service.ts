import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken() {
    return localStorage.getItem('jwt');
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  destroyToken() {
    localStorage.removeItem('jwt');
  }
}
