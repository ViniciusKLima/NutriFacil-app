import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {
  nome: string = '';
  email: string = '';
  senha: string = '';
  peso: number | null = null;
  altura: number | null = null;
  metaAgua: number | null = null;
  dieta: string = '';
  inputEmFoco = false;
  dietas = [
    { nome: 'Perder Peso', descricao: '...', indice: 0 },
    { nome: 'Manter Peso', descricao: '...', indice: 1 },
    { nome: 'Ganhar Peso', descricao: '...', indice: 2 },
  ];
  dietaSelecionada = 0;

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  async cadastrar() {
    // Validação de campos obrigatórios
    if (
      !this.nome.trim() ||
      !this.email.trim() ||
      !this.senha.trim() ||
      !this.peso ||
      !this.altura ||
      !this.metaAgua
    ) {
      this.mostrarToast('Preencha todos os campos obrigatórios.', 'danger');
      return;
    }

    // Validação de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
    if (!emailValido) {
      this.mostrarToast('Digite um email válido.', 'danger');
      return;
    }

    // Mostra o loading
    const loading = await this.loadingCtrl.create({
      message: 'Verificando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Verifica se já existe usuário com o mesmo email
      const usuarios = await this.perfilService.getUsuarioPorEmail(this.email).toPromise();

      if (usuarios && usuarios.length > 0) {
        await loading.dismiss();
        this.mostrarToast('Já existe um usuário com esse email.', 'danger');
        return;
      }

      // Prepara dados do usuário
      const usuario = {
        nome: this.nome.trim(),
        email: this.email.trim(),
        senha: this.senha,
        peso: this.peso,
        altura: this.altura,
        metaAgua: this.metaAgua,
        dieta: this.dietas[this.dietaSelecionada].nome,
        dietaIndice: this.dietaSelecionada,
      };

      // Faz o cadastro
      await this.perfilService.criarUsuario(usuario).toPromise();
      await loading.dismiss();

      this.mostrarToast('Cadastro realizado com sucesso!', 'success');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao cadastrar:', error);
      this.mostrarToast('Erro ao cadastrar. Verifique sua conexão.', 'danger');
    }
  }

  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      color: cor,
      buttons: [{ text: 'X', role: 'cancel' }],
    });
    await toast.present();
  }
}