import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Constants} from "../../environments/constants";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }

  login(login: string, password: string): Observable<any> {
    const basicToken = this.encodeUnicodeBase64(`${login}:${password}`);
    const headers = new HttpHeaders(
      {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'x-www-form-urlencoded'
      });
    const body = null;


    let url = `${Constants.API_ROOT + Constants.API_AUTHENTICATE}`;
    return this.http
      .post<any>(url, body, {headers}).pipe(
        map(res => this.extractData(res)),
        catchError(err => this.errorHandler(err))
      );
  }

  /**
   * Procedure d'encodage en base64 des caractères unicode afin de palier au bug de btoa natif.
   * @param value chaine a encoder.
   * @returns chaine encodée.
   */
  encodeUnicodeBase64(value: string): string {
    return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  /**
   * Traitement de l'erreur : affichage du message dans la console et propagation d'une exception.
   * @param error L'erreur à traiter
   * @returns L'exception.
   */
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    const errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
    return throwError(() => new Error(errMsg));
  }

  private extractData(res: any): User   {
    let token = res.id_token;
    let decodeToken = this.jwtHelper.decodeToken(token);
    let user = new User(decodeToken.login, "", token);
    return user;
  }
}
