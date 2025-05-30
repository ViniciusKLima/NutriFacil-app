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
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
  }

  // Verifica no dispositivo se escolheu True ou False no modo norturno 
  ngOnInit() {
    this.darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkModeAtivo);
  }

  // Toggle para escolher modo nortuno
  toggleDarkMode(event: any) {
    this.darkModeAtivo = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeAtivo);
    localStorage.setItem('darkMode', this.darkModeAtivo ? 'true' : 'false');
  }

  // Função logout
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