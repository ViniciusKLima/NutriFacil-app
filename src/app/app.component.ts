import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    // Aplica o modo noturno salvo ao iniciar o app
    const darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', darkModeAtivo);
  }
}