import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()

export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }

  // Register : Making a post request to register API
  registerUser(user){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/signup', user, {headers: headers})
    .map(res => res.json());
  }

  // Login : Making a post request to authenticate API
  authenticateUser(user){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/login', user, {headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token')
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
