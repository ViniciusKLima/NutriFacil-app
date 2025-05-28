import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(
    private router: Router, private screenOrientation: ScreenOrientation
  ) {
    // Aplica o modo noturno salvo ao iniciar o app
    const darkModeAtivo = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', darkModeAtivo);
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // Redireciona para cadastro inicial se não houver perfil cadastrado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }

    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }
}
