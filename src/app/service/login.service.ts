import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogin = new Observable()

  constructor(private http: HttpClient) { }

  userLogin(obj: any) {
    return this.http.post(
      "https://fakestoreapi.com/auth/login",
      obj
      )
  }

}
