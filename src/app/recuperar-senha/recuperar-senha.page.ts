import { Component } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: false,
})
export class RecuperarSenhaPage {
  email: string = '';
  dataNascimento: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';
  mostrarFormSenha: boolean = false;
  usuarioId: string = '';

  constructor(
    private perfilService: PerfilService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async presentToast(message: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'top',
    });
    await toast.present();
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  }

  validarDados() {
    // Verificação local antes de fazer requisição
    if (!this.email || !this.dataNascimento) {
      this.presentToast('Preencha todos os campos.');
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.presentToast('Digite um e-mail válido.');
      return;
    }

    this.perfilService.getUsuarioPorEmail(this.email).subscribe({
      next: (users) => {
        if (!users.length) {
          this.presentToast('E-mail não encontrado.');
          return;
        }

        const usuario = users[0];

        if (
          usuario.email?.toLowerCase() === this.email.toLowerCase() &&
          usuario.dataNascimento?.split('T')[0] === this.dataNascimento
        ) {
          this.usuarioId = usuario.id;
          this.mostrarFormSenha = true;
          this.presentToast('Dados validados. Agora, defina uma nova senha.', 'success');
        } else {
          this.presentToast('Dados não conferem. Verifique e tente novamente.');
        }
      },
      error: () => {
        this.presentToast('Erro ao verificar dados. Tente novamente mais tarde.');
      },
    });
  }

  alterarSenha() {
    if (!this.novaSenha || !this.confirmarSenha) {
      this.presentToast('Preencha todos os campos de senha.');
      return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.presentToast('As senhas não coincidem.');
      return;
    }

    const dados = { senha: this.novaSenha };

    this.perfilService.atualizarUsuario(this.usuarioId, dados).subscribe({
      next: () => {
        this.presentToast('Senha atualizada com sucesso!', 'success');
        this.navCtrl.navigateBack('/login');
      },
      error: () => {
        this.presentToast('Erro ao atualizar senha. Tente novamente.');
      },
    });
  }
}
