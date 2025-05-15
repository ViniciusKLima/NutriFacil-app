import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  getPerfil() {
    return JSON.parse(localStorage.getItem('perfil') || '{}');
  }

  setPerfil(perfil: { nome: string, peso: number, altura: number }) {
    localStorage.setItem('perfil', JSON.stringify(perfil));
  }
}