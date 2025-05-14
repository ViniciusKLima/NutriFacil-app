import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  darkModeAtivo = false;
  notificacoesAtivas = true;

  constructor(
    private notificationService: NotificationService,
    private localNotifications: LocalNotifications
  ) {}

  ngOnInit() {
    this.darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkModeAtivo);
  }

  toggleDarkMode(event: any) {
    this.darkModeAtivo = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeAtivo);
    localStorage.setItem('darkMode', this.darkModeAtivo ? 'true' : 'false');
  }

  toggleNotificacoes() {
    if (this.notificacoesAtivas) {
      this.localNotifications.hasPermission().then((permissao) => {
        if (permissao) {
          this.notificationService.agendarNotificacoes();
        } else {
          this.pedirPermissao();
        }
      });
    } else {
      this.localNotifications.cancelAll();
    }
  }

  pedirPermissao() {
    this.localNotifications.requestPermission().then((granted) => {
      if (granted) {
        this.notificationService.agendarNotificacoes();
        // Notificação de boas-vindas apenas no primeiro acesso
        if (!localStorage.getItem('boasVindasEnviada')) {
          this.notificationService.enviarBoasVindas();
          localStorage.setItem('boasVindasEnviada', 'true');
        }
      }
    });
  }
}
