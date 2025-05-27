import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  // Substitua essa URL pelo link do seu endpoint no MockAPI
  private api = 'https://68360978664e72d28e3faf8c.mockapi.io/api/v1/perfis ';

  constructor(private http: HttpClient) {}

  // Buscar usuário(s) pelo email (para login/cadastro)
  getUsuarioPorEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?email=${email}`);
  }

  // Buscar perfil pelo id
  getPerfilPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Criar novo perfil/usuário
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.api, usuario);
  }

  // Atualizar perfil/usuário existente
  atualizarUsuario(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  // Deletar um perfil (opcional, mas útil)
  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}