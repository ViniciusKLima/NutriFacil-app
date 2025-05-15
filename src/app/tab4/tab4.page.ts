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

  // Variáveis do formulário de perfil
  mostrarFormulario = false;
  nome: string = '';
  peso: number | null = null;
  altura: number | null = null;

  constructor(
    private notificationService: NotificationService,
    private localNotifications: LocalNotifications
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

  // Salva os dados do perfil no localStorage e fecha o formulário
  salvarPerfil() {
    localStorage.setItem('perfil', JSON.stringify({
      nome: this.nome,
      peso: this.peso,
      altura: this.altura
    }));
    this.mostrarFormulario = false;
  }
}