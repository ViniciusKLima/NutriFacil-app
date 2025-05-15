import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  imc: number | null = null;
  imcIdeal: number = 22.0; // IMC ideal padrão
  imcClassificacao: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nome = perfil.nome || '';
    this.peso = perfil.peso || null;
    this.altura = perfil.altura || null;
    this.atualizarCalculos();
  }

  salvarPerfil() {
    localStorage.setItem(
      'perfil',
      JSON.stringify({
        nome: this.nome,
        peso: this.peso,
        altura: this.altura,
      })
    );
    // this.navCtrl.back(); // Removido para não sair da página
    this.atualizarCalculos();
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