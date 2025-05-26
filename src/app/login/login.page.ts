import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';

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
    private toastController: ToastController
  ) {}

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  // Caso queira manter o toast para outros usos
  async mostrarToastErro(msg: string) {
    const toast = await this.toastController.create({
      message: `ℹ️ ${msg}`,
      duration: 3000,
      color: 'danger',
      position: 'top',
      cssClass: 'toast-custom',
      mode: 'ios',
      buttons: [],
    });
    toast.present();
  }

  async logar() {
    if (!this.email || !this.senha) {
      this.erroCampos = true;
      this.mensagemErro = 'Preencha os campos vazios';
      setTimeout(() => {
        this.erroCampos = false;
        this.mensagemErro = '';
      }, 3000);
      return;
    }

    this.perfilService.getUsuarioPorEmail(this.email).subscribe(
      (users) => {
        if (users.length && users[0].senha === this.senha) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', this.email);
          this.router.navigate(['/tabs/tab1']);
        } else {
          this.mensagemErro = 'Email ou senha inválidos.';
          setTimeout(() => {
            this.mensagemErro = '';
          }, 3000);
        }
      },
      () => {
        this.mensagemErro = 'Erro ao conectar ao servidor.';
        setTimeout(() => {
          this.mensagemErro = '';
        }, 3000);
      }
    );
  }
}