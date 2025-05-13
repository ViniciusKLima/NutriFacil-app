import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  usuario = {
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.logar(this.usuario.email, this.usuario.senha).subscribe((usuarios: string | any[]) => {
      if (usuarios.length > 0) {
        alert('Login realizado!');
        this.router.navigate(['/tabs/tab1']);
      } else {
        alert('Email ou senha inválidos');
      }
    });
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']);
  }
}