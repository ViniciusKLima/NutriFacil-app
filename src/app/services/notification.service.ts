import { Injectable } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private localNotifications: LocalNotifications) {}

  agendarNotificacoes() {
    const horarios = [
      {
        id: 1,
        title: 'Bom dia!',
        text: 'Hora da primeira refeição.',
        hora: 8,
        minuto: 0,
      },
      {
        id: 2,
        title: 'Lanche da manhã',
        text: 'Hora de se alimentar!',
        hora: 10,
        minuto: 30,
      },
      {
        id: 3,
        title: 'Almoço',
        text: 'A principal refeição do dia!',
        hora: 12,
        minuto: 30,
      },
      {
        id: 4,
        title: 'Lanche da tarde',
        text: 'Vamos repor a energia?',
        hora: 15,
        minuto: 30,
      },
      {
        id: 5,
        title: 'Pré-janta',
        text: 'Um reforço antes da janta!',
        hora: 17,
        minuto: 30,
      },
      {
        id: 6,
        title: 'Jantar',
        text: 'Hora de uma boa refeição!',
        hora: 19,
        minuto: 30,
      },
      { id: 7, title: 'Ceia', text: 'Talvez algo leve?', hora: 21, minuto: 0 },
      {
        id: 8,
        title: 'Última checagem!',
        text: 'Marcou todas as refeições hoje?',
        hora: 22,
        minuto: 0,
      },
    ];

    const notificacoes = horarios.map((h) => ({
      id: h.id,
      title: h.title,
      text: h.text,
      trigger: { every: { hour: h.hora, minute: h.minuto } },
      foreground: true,
    }));

    this.localNotifications.schedule(notificacoes);
  }

  enviarBoasVindas() {
    this.localNotifications.schedule({
      id: 100,
      title: 'Bem-vindo ao NutriFácil!',
      text: 'Seu app de saúde está pronto para te ajudar!',
      foreground: true,
      trigger: { in: 2, unit: ELocalNotificationTriggerUnit.SECOND },
    });
  }
}
