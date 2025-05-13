import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.API_URL, usuario);
  }

  logar(email: string, senha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}?email=${email}&senha=${senha}`);
  }
}
