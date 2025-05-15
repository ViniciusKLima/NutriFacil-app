import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-inicial',
  templateUrl: './cadastro-inicial.page.html',
  styleUrls: ['./cadastro-inicial.page.scss'],
  standalone: false,
})
export class CadastroInicialPage {
  nome: string = '';
  peso: number | null = null;
  altura: number | null = null;
  metaAgua: number | null = null;
  loading = false;

  constructor(private router: Router) {}

  salvarPerfil() {
    if (!this.nome || !this.peso || !this.altura || !this.metaAgua) {
      return;
    }
    localStorage.setItem(
      'perfil',
      JSON.stringify({
        nome: this.nome,
        peso: this.peso,
        altura: this.altura,
        metaAgua: this.metaAgua,
      })
    );
    localStorage.setItem('perfilCadastrado', 'true');
    localStorage.setItem('primeiroAcesso', 'true');

    this.loading = true; // Mostra o loading

    setTimeout(() => {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    }, 1500); // 1.5 segundos de loading (ajuste se quiser)
  }
}
