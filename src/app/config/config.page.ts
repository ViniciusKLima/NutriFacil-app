import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: false,
})
export class ConfigPage implements OnInit {
  darkModeAtivo = false;

  // Variáveis do formulário de perfil
  mostrarFormulario = false;
  nome: string = '';
  peso: number | null = null;
  altura: number | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    // Carrega dados do perfil ao abrir a página
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nome = perfil.nome || '';
    this.peso = perfil.peso || null;
    this.altura = perfil.altura || null;
  }

  ngOnInit() {
    this.darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkModeAtivo);
  }

  toggleDarkMode(event: any) {
    this.darkModeAtivo = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeAtivo);
    localStorage.setItem('darkMode', this.darkModeAtivo ? 'true' : 'false');
  }

  // Salva os dados do perfil no localStorage e fecha o formulário
  salvarPerfil() {
    localStorage.setItem(
      'perfil',
      JSON.stringify({
        nome: this.nome,
        peso: this.peso,
        altura: this.altura,
      })
    );
    this.mostrarFormulario = false;
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza que deseja sair?',
      cssClass: 'alert-sair-custom',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          handler: () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('email');
            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
        },
      ],
    });
    await alert.present();
  }
}