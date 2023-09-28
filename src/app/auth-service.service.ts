import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private tokenKey = 'jwt_token';
  token: any;

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const tokenPayload: any = jwt_decode(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp > currentTimeInSeconds) {
      return true;
    }
    return false;
  }

  registerMe(userData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/api/v1/auth/register';
    return this.http.post(apiUrl, userData);
  }


  UserLogin(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(
      'http://localhost:8080/api/v1/auth/authenticate',
      credentials
    );
  }
}


function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}
