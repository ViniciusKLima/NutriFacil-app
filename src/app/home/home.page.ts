import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  NgZone,
} from '@angular/core';
import { DietaService } from '../services/dieta.service';
import * as ProgressBar from 'progressbar.js';
import { PerfilService } from '../services/perfil.service';
import { DivInterativaService } from '../services/div-interativa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit, OnInit {
  @ViewChild('progressBar', { static: true }) progressBarElement!: ElementRef;
  private bar: any;

  dataAtual: string = '';
  nome: string = '';
  peso: number | null = null;
  altura: number | null = null;
  imc: number | null = null;
  pesoIdeal: number | null = null;

  refeicoes: { nome: string; descricao: string; checked: boolean }[] = [];

  divInterativa = {
    titulo: '',
    paragrafo: '',
    imagem: '',
    gradient: '',
  };

  constructor(
    private dietaService: DietaService,
    private ngZone: NgZone,
    private perfilService: PerfilService,
    private divInterativaService: DivInterativaService
  ) {
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
            checked: refeicoesSalvas[idx]?.checked ?? false,
          }));
        } else {
          this.refeicoes = dieta.refeicoes.map((ref) => ({
            ...ref,
            checked: false,
          }));
        }
      } else {
        // Se for um novo dia, reseta todos os checks
        this.refeicoes = dieta.refeicoes.map((ref) => ({
          ...ref,
          checked: false,
        }));
        this.salvarChecks(); // já salva o reset para o novo dia
      }
      this.atualizarProgresso();
    });

    // Formatação da data
    const hoje = new Date();
    let data = hoje.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
    });

    // Remove o ponto após o dia da semana (ex: "qui, 16 de julho")
    data = data.replace('.', '');

    // Coloca a primeira letra do dia da semana e do mês em maiúsculo
    data = data.replace(
      /^([a-zá-úç]+), (\d{2}) de ([a-zá-úç]+)/i,
      (match, dia, numero, mes) => {
        return (
          dia.charAt(0).toUpperCase() +
          dia.slice(1) +
          ', ' +
          numero +
          ' de ' +
          mes.charAt(0).toUpperCase() +
          mes.slice(1)
        );
      }
    );

    this.dataAtual = data;
  }

  ngOnInit() {
    this.divInterativa = this.divInterativaService.getDivInterativaAtual();
    setInterval(() => {
      this.ngZone.run(() => {
        this.divInterativa = this.divInterativaService.getDivInterativaAtual();
      });
    }, 60 * 1000);

    // Busca o perfil do usuário logado no backend
    const email = localStorage.getItem('email');
    if (email) {
      this.perfilService.getUsuarioPorEmail(email).subscribe((users) => {
        if (users.length) {
          const perfil = users[0];
          this.nome = perfil.nome || '';
          this.peso = perfil.peso || null;
          this.altura = perfil.altura || null;
          this.calcularIMC();
          this.verificarTodasRefeicoesMarcadas();
        }
      });
    }
  }

  // Calcula IMC
  calcularIMC() {
    if (this.peso && this.altura) {
      const alturaMetros = this.altura / 100; // converte cm para metros
      this.imc = +(this.peso / (alturaMetros * alturaMetros)).toFixed(2);
      this.pesoIdeal = +(22 * Math.pow(alturaMetros, 2)).toFixed(1);
    } else {
      this.imc = null;
      this.pesoIdeal = null;
    }
  }

  formatarIMC(imc: number | null): string {
    if (imc === null || imc === undefined) return '--';
    return imc % 1 === 0 ? imc.toString() : imc.toFixed(1);
  }

  ngAfterViewInit(): void {

    // Configurações da Barra de Progresso Circular
    this.bar = new ProgressBar.Circle(this.progressBarElement.nativeElement, {
      strokeWidth: 6,
      color: 'white',
      trailColor: '#2f974b',
      trailWidth: 6,
      duration: 1400,
      easing: 'easeInOut',
    });
    this.atualizarProgresso();
  }

  // Atualiza o progresso referente aos checks
  atualizarProgresso() {
    const total = this.refeicoes.length;
    const marcados = this.refeicoes.filter((r) => r.checked).length;
    const progresso = total > 0 ? marcados / total : 0;
    if (this.bar) {
      this.bar.animate(progresso);
    }
  }

  // Salva os Check Localmente
  salvarChecks() {
    localStorage.setItem('refeicoesCheck', JSON.stringify(this.refeicoes));
    localStorage.setItem('refeicoesCheckData', new Date().toDateString());
  }

  onCheckChange() {
    this.atualizarProgresso();
    this.salvarChecks();
    this.verificarTodasRefeicoesMarcadas();
  }

  // Se todos os checks forem marcados, atualiza a div do brocolíto
  private verificarTodasRefeicoesMarcadas() {
    if (this.refeicoes.length && this.refeicoes.every((r) => r.checked)) {
      // Força a div interativa final
      this.divInterativa = {
        titulo: 'Uau! Todas as refeições concluídas!',
        paragrafo: 'Seu futuro saudável agradece!',
        imagem: 'assets/imagens/brocolito/brocolito-feliz.png',
        gradient: 'linear-gradient(to right, #896EFF, #A3BDFF)',
      };
    } else {
      // Volta ao comportamento normal
      this.divInterativa = this.divInterativaService.getDivInterativaAtual();
    }
  }
}
