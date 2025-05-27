import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {
  nome: string = '';
  email: string = '';
  senha: string = '';
  peso: number | null = null;
  altura: number | null = null;
  metaAgua: number | null = null;
  dieta: string = '';
  mensagemErro: string = '';
  corPopup: string = 'erro'; // 'erro' ou 'sucesso'
  dietas = [
    { nome: 'Perder Peso', descricao: '...', indice: 0 },
    { nome: 'Manter Peso', descricao: '...', indice: 1 },
    { nome: 'Ganhar Peso', descricao: '...', indice: 2 },
  ];
  dietaSelecionada = 0;

  constructor(private router: Router, private perfilService: PerfilService) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  cadastrar() {
    // Validação de campos obrigatórios
    if (
      !this.nome.trim() ||
      !this.email.trim() ||
      !this.senha.trim() ||
      !this.peso ||
      !this.altura ||
      !this.metaAgua
    ) {
      this.corPopup = 'erro';
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      setTimeout(() => {
        this.mensagemErro = '';
      }, 3000);
      return;
    }

    // Validação de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
    if (!emailValido) {
      this.corPopup = 'erro';
      this.mensagemErro = 'Digite um email válido.';
      setTimeout(() => {
        this.mensagemErro = '';
      }, 3000);
      return;
    }

    // Verifica se já existe usuário com o mesmo email
    this.perfilService.getUsuarioPorEmail(this.email).subscribe((users) => {
      if (users.length) {
        this.corPopup = 'erro';
        this.mensagemErro = 'Já existe um usuário com esse email.';
        setTimeout(() => {
          this.mensagemErro = '';
        }, 3000);
        return;
      }

      const usuario = {
        nome: this.nome.trim(),
        email: this.email.trim(),
        senha: this.senha,
        peso: this.peso,
        altura: this.altura,
        metaAgua: this.metaAgua,
        dieta: this.dietas[this.dietaSelecionada].nome,
        dietaIndice: this.dietaSelecionada,
      };

      this.perfilService.criarUsuario(usuario).subscribe(() => {
        this.corPopup = 'sucesso';
        this.mensagemErro = 'Cadastro realizado com sucesso!';
        setTimeout(() => {
          this.mensagemErro = '';
          this.corPopup = 'erro';
          this.router.navigate(['/login']);
        }, 2000);
      });
    });
  }
}
