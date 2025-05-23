import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  nome: string = '';
  peso: number | null = null;
  altura: number | null = null;
  metaAgua: number | null = null;
  imc: number | null = null;
  imcIdeal: number = 22.0; // IMC ideal padrão
  imcClassificacao: string = '';
  private perfilOriginal: any = {};

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }

  ionViewWillEnter() {
    document.body.classList.add('page-perfil');
  }

  ionViewWillLeave() {
    document.body.classList.remove('page-perfil');
  }

  ngOnInit() {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nome = perfil.nome || '';
    this.peso = perfil.peso || null;
    this.altura = perfil.altura || null;
    this.metaAgua = perfil.metaAgua || null;
    this.atualizarCalculos();

    this.perfilOriginal = {
      nome: this.nome,
      peso: this.peso,
      altura: this.altura,
      metaAgua: this.metaAgua,
    };
  }

  houveAlteracao(): boolean {
    return (
      this.nome !== this.perfilOriginal.nome ||
      this.peso !== this.perfilOriginal.peso ||
      this.altura !== this.perfilOriginal.altura ||
      this.metaAgua !== this.perfilOriginal.metaAgua
    );
  }

  async salvarPerfil() {
    localStorage.setItem(
      'perfil',
      JSON.stringify({
        nome: this.nome,
        peso: this.peso,
        altura: this.altura,
        metaAgua: this.metaAgua,
      })
    );
    this.atualizarCalculos();
    await this.presentToast('Informações salvas com sucesso!');

    // Atualize o perfilOriginal após salvar
    this.perfilOriginal = {
      nome: this.nome,
      peso: this.peso,
      altura: this.altura,
      metaAgua: this.metaAgua,
    };
  }

  atualizarCalculos() {
    if (this.peso && this.altura) {
      const alturaMetros = this.altura / 100;
      this.imc = +(this.peso / (alturaMetros * alturaMetros)).toFixed(1);
      this.imcClassificacao = this.classificarIMC(this.imc);
    } else {
      this.imc = null;
      this.imcClassificacao = '';
    }
  }

  classificarIMC(imc: number): string {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade grau I';
    if (imc < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  }

  getImcClass(): string {
    if (this.imc === null) return '';
    if (this.imc < 18.5) return 'imc-abaixo';
    if (this.imc < 25) return 'imc-normal';
    if (this.imc < 30) return 'imc-sobrepeso';
    if (this.imc < 35) return 'imc-obesidade1';
    if (this.imc < 40) return 'imc-obesidade2';
    return 'imc-obesidade3';
  }
}
