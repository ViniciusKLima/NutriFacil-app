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
    if (!this.email || !this.senha) {
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
      const usuarios = await this.perfilService.getUsuarioPorEmail(this.email).toPromise();

      await loading.dismiss();

      if (usuarios && usuarios.length > 0 && usuarios[0].senha === this.senha) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', this.email);
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.mostrarToast('Email ou senha inválidos.', 'danger');
      }
    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao fazer login:', error);
      this.mostrarToast('Erro ao conectar ao servidor. Tente novamente.', 'danger');
    }
  }
}