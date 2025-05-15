import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(
    private localNotifications: LocalNotifications,
    private notificationService: NotificationService
  ) {
    // Aplica o modo noturno salvo ao iniciar o app
    const darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', darkModeAtivo);
  }

  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);

    this.localNotifications.requestPermission().then(granted => {
      if (granted) {
        console.log('Permissão concedida para notificações!');
        this.notificationService.agendarNotificacoes();
        this.notificationService.enviarBoasVindas();
      }
    });
  }
}