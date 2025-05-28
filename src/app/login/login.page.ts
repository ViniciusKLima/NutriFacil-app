import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  senha: string = '';
  erroCampos = false;
  mensagemErro: string = '';

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
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

  async logar() {
    const emailLimpo = this.email.trim();
    const senhaDigitada = this.senha.trim();

    if (!emailLimpo || !senhaDigitada) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }

    // Verifica conexão
    const status = await Network.getStatus();
    if (!status.connected) {
      this.mostrarToast('Você está sem conexão.', 'medium');
      return;
    }

    // Mostra o loading
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      console.log('Buscando usuário com email:', emailLimpo);
      const usuarios = await this.perfilService
        .getUsuarioPorEmail(emailLimpo)
        .toPromise();

      await loading.dismiss();

      console.log('Usuário encontrado:', usuarios?.[0] || {});

      if (usuarios && usuarios.length > 0) {
        const usuario = usuarios[0];

        // Garanta que ambas as senhas estão limpas antes de comparar
        if (usuario.senha.trim() === senhaDigitada) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', emailLimpo);
          this.router.navigate(['/tabs/tab1']);
        } else {
          this.mostrarToast('Senha incorreta.', 'danger');
        }
      } else {
        this.mostrarToast('Email não encontrado.', 'danger');
      }
    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao fazer login:', error);

      this.mostrarToast('Erro ao conectar ao servidor. Tente novamente.', 'danger');
    }
  }
}