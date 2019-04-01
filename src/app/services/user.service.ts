import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(
    distinctUntilChanged((x, y) => {
      Object.keys(x).forEach(key => {
        if (x[key] !== y[key]) {
          return true;
        }
      });
      return false;
    })
  );
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attempAuth(type: string, user: object): Observable<User> {
    const route = type === 'login' ? '/login' : '';

    return this.apiService.post(`users${route}`, { user }).pipe(
      map(data => {
        this.setAuth(data.user);
        return data.user;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get('users').pipe(
      map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  updateCurrentUser(user: User): Observable<User> {
    return this.apiService.put('users', { user }).pipe(
      map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}
