import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { LoadingController, ToastController } from '@ionic/angular';

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
  inputEmFoco = false;

  corPopup: string = 'erro';
  mensagemErro: string = '';

  dietas = [
    { nome: 'Perder Peso', descricao: '...', indice: 0 },
    { nome: 'Manter Peso', descricao: '...', indice: 1 },
    { nome: 'Ganhar Peso', descricao: '...', indice: 2 },
  ];
  dietaSelecionada = 0;

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  async cadastrar() {
    const emailLimpo = this.email.trim();

    console.log('Email digitado:', this.email);
    console.log('Email após trim():', emailLimpo);

    if (
      !this.nome.trim() ||
      !emailLimpo ||
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

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);
    if (!emailValido) {
      this.corPopup = 'erro';
      this.mensagemErro = 'Digite um email válido.';
      setTimeout(() => {
        this.mensagemErro = '';
      }, 3000);
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Verificando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      console.log('Buscando usuário com email:', emailLimpo);
      const usuarios = await this.perfilService.getUsuarioPorEmail(emailLimpo).toPromise();
      console.log('Usuários encontrados:', usuarios);

      if (usuarios && usuarios.length > 0) {
        await loading.dismiss();
        this.corPopup = 'erro';
        this.mensagemErro = 'Já existe um usuário com esse email.';
        setTimeout(() => {
          this.mensagemErro = '';
        }, 3000);
        return;
      }

      const usuario = {
        nome: this.nome.trim(),
        email: emailLimpo,
        senha: this.senha,
        peso: this.peso,
        altura: this.altura,
        metaAgua: this.metaAgua,
        dieta: this.dietas[this.dietaSelecionada].nome,
        dietaIndice: this.dietaSelecionada,
      };

      console.log('Cadastrando novo usuário:', usuario);
      const resultado = await this.perfilService.criarUsuario(usuario).toPromise();
      console.log('Usuário cadastrado com sucesso:', resultado);

      await loading.dismiss();

      this.corPopup = 'sucesso';
      this.mensagemErro = 'Cadastro realizado com sucesso!';
      setTimeout(() => {
        this.mensagemErro = '';
        this.router.navigate(['/login']);
      }, 1500);

    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao cadastrar:', error);

      let mensagem = 'Erro ao cadastrar. Verifique sua conexão.';

      if (error instanceof Error) {
        mensagem = `Erro: ${error.message}`;
      }

      this.corPopup = 'erro';
      this.mensagemErro = mensagem;
      setTimeout(() => {
        this.mensagemErro = '';
      }, 3000);

      this.mostrarToast(mensagem, 'danger');
    }
  }

  async mostrarToast(mensagem: string, cor: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      color: cor,
      buttons: [{ text: 'X', role: 'cancel' }],
    });
    await toast.present();
  }
}