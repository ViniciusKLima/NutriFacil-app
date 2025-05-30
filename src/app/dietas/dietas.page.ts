import { Component, OnInit } from '@angular/core';
import { DietaService } from '../services/dieta.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-dietas',
  templateUrl: 'dietas.page.html',
  styleUrls: ['dietas.page.scss'],
  standalone: false,
})
export class DietasPage implements OnInit {
  dietas = this.dietaService.getDietas();
  dietaSelecionada = 0;

  constructor(
    private dietaService: DietaService,
    private perfilService: PerfilService
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (email) {
      this.perfilService.getUsuarioPorEmail(email).subscribe(users => {
        if (users.length) {
          this.dietaSelecionada = users[0].dietaIndice ?? 0;
          this.dietaService.selecionarDieta(this.dietaSelecionada);
        }
      });
    }
  }

  selecionarDieta(indice: number) {
    this.dietaSelecionada = indice;
    this.dietaService.selecionarDieta(indice);

    // Atualiza no backend também!
    const email = localStorage.getItem('email');
    if (email) {
      this.perfilService.getUsuarioPorEmail(email).subscribe(users => {
        if (users.length) {
          const usuario = users[0];
          this.perfilService.atualizarUsuario(usuario.id, {
            ...usuario,
            dietaIndice: indice,
            dieta: this.dietas[indice].nome
          }).subscribe();
        }
      });
    }
  }
}