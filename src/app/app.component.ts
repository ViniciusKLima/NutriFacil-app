import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';

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
    private notificationService: NotificationService,
    private router: Router
  ) {
    // Aplica o modo noturno salvo ao iniciar o app
    const darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', darkModeAtivo);
  }

  ngOnInit() {
    // Redireciona para cadastro inicial se não houver perfil cadastrado
    const perfilCadastrado = localStorage.getItem('perfilCadastrado');
    if (!perfilCadastrado) {
      this.router.navigateByUrl('/cadastro-inicial', { replaceUrl: true });
    }

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