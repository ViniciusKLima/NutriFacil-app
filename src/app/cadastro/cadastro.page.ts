import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false
})
export class CadastroPage {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    altura: '',
    pesoIdeal: '',
    pesoAtual: '',
    metaDieta: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.cadastrar(this.usuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao cadastrar: ' + (err.error?.message || 'Tente novamente.'));
      }
    });
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}