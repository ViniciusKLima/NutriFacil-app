import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { DietaService } from '../services/dieta.service';
import * as ProgressBar from 'progressbar.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements AfterViewInit, OnInit {
  @ViewChild('progressBar', { static: true }) progressBarElement!: ElementRef;
  private bar: any;
  dataAtual: string = '';

  altura: number = 1.75;
  pesoAtual: number = 86.2;
  pesoIdeal: number = 75;
  valorIMC: number = this.pesoAtual / (this.altura * this.altura);

  refeicoes: { nome: string; descricao: string; checked: boolean }[] = [];

  constructor(private dietaService: DietaService) {
    this.dietaService.dietaSelecionada$.subscribe((dieta) => {
      // Lógica para resetar os checks se mudou o dia
      const dataSalva = localStorage.getItem('refeicoesCheckData');
      const hoje = new Date().toDateString();

      if (dataSalva === hoje) {
        const checksSalvos = localStorage.getItem('refeicoesCheck');
        if (checksSalvos) {
          const refeicoesSalvas = JSON.parse(checksSalvos);
          this.refeicoes = dieta.refeicoes.map((ref, idx) => ({
            ...ref,
            checked: refeicoesSalvas[idx]?.checked ?? false
          }));
        } else {
          this.refeicoes = dieta.refeicoes.map(ref => ({
            ...ref,
            checked: false
          }));
        }
      } else {
        // Se for um novo dia, reseta todos os checks
        this.refeicoes = dieta.refeicoes.map(ref => ({
          ...ref,
          checked: false
        }));
        this.salvarChecks(); // já salva o reset para o novo dia
      }
      this.atualizarProgresso();
    });

    const hoje = new Date();
    let data = hoje.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
    });

    // Remove o ponto após o dia da semana (ex: "qui, 16 de julho")
    data = data.replace('.', '');

    // Coloca a primeira letra do dia da semana e do mês em maiúsculo
    data = data.replace(/^([a-zá-úç]+), (\d{2}) de ([a-zá-úç]+)/i, (match, dia, numero, mes) => {
      return (
        dia.charAt(0).toUpperCase() + dia.slice(1) +
        ', ' +
        numero +
        ' de ' +
        mes.charAt(0).toUpperCase() + mes.slice(1)
      );
    });

    this.dataAtual = data;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.bar = new ProgressBar.Circle(this.progressBarElement.nativeElement, {
      strokeWidth: 8,
      color: 'white',
      trailColor: '#2f974b',
      trailWidth: 8,
      duration: 1400,
      easing: 'easeInOut',
    });
    this.atualizarProgresso();
  }

  atualizarProgresso() {
    const total = this.refeicoes.length;
    const marcados = this.refeicoes.filter((r) => r.checked).length;
    const progresso = total > 0 ? marcados / total : 0;
    if (this.bar) {
      this.bar.animate(progresso);
    }
  }

  salvarChecks() {
    localStorage.setItem('refeicoesCheck', JSON.stringify(this.refeicoes));
    localStorage.setItem('refeicoesCheckData', new Date().toDateString());
  }

  onCheckChange() {
    this.atualizarProgresso();
    this.salvarChecks();
  }
}