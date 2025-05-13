import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  darkModeAtivo = false;

  ngOnInit() {
    // Recupera a preferência salva ao abrir a página
    this.darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkModeAtivo);
  }

  toggleDarkMode(event: any) {
    this.darkModeAtivo = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeAtivo);
    localStorage.setItem('darkMode', this.darkModeAtivo ? 'true' : 'false');
  }
}
