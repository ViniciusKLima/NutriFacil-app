import { Component, AfterViewInit } from '@angular/core';
import ProgressBar from 'progressbar.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements AfterViewInit {
  meta = 4000;
  progressoAtual = 0;
  valorAdicionar: number | null = null;
  historico: { valor: number; hora: string }[] = []; // Alteração no tipo para armazenar hora também

  private progressCircle: any;

  ngAfterViewInit() {
    this.progressCircle = new ProgressBar.Circle('#progressCircle', {
      strokeWidth: 6,
      color: 'white',
      trailColor: '#28a745',
      trailWidth: 6,
      easing: 'easeInOut',
      duration: 500,
    });

    this.atualizarBarra();
  }

  adicionarValor() {
    if (this.valorAdicionar && this.valorAdicionar > 0) {
      this.progressoAtual += this.valorAdicionar;

      // Obtém a hora atual formatada
      const horaAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Adiciona valor e hora ao histórico
      this.historico.unshift({ valor: this.valorAdicionar, hora: horaAtual });

      this.atualizarBarra();
      this.valorAdicionar = null;
    }
  }

  atualizarBarra() {
    let progresso = Math.min(this.progressoAtual / this.meta, 1);
    this.progressCircle.animate(progresso);
  }
}
