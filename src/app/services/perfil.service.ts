import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private api = 'http://localhost:3000/perfis'; // ajuste conforme seu db.json

  constructor(private http: HttpClient) {}

  // Buscar usuário pelo email (para login/cadastro)
  getUsuarioPorEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?email=${email}`);
  }

  // Buscar perfil pelo id
  getPerfilPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Criar novo perfil/usuário
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.api, usuario);
  }

  // Atualizar perfil/usuário existente
  atualizarUsuario(id: string, dados: any) {
    return this.http.patch(`${this.api}/${id}`, dados);
  }
}
