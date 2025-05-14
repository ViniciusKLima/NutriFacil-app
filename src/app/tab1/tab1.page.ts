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

  divInterativa = {
    titulo: '',
    paragrafo: '',
    imagem: '',
    gradient: '',
  };

  private horarios = [
    {
      hora: 0,
      titulo: 'Brocolito já tá quase dormindo...',
      paragrafo: 'Hora de descansar e se preparar para um novo dia.',
      imagem: 'assets/imagens/brocolito/brocolito-sono.png',
      gradient: 'linear-gradient(to right, #11236B ,#0B1A42)',
    },
    {
      hora: 6,
      titulo: 'Bom dia! Hora de começar bem com a primeira refeição!',
      paragrafo: 'Vamos juntos!',
      imagem: 'assets/imagens/brocolito/brocolito-acorda.png',
      gradient: 'linear-gradient(to right, #FFC300, #FBB036)',
    },
    {
      hora: 11,
      titulo: 'Vamos para mais uma refeição?',
      paragrafo: 'Seu corpo agradece cada escolha saudável!',
      imagem: 'assets/imagens/brocolito/brocolito-comer.png',
      gradient: 'linear-gradient(to right, #39A278 30%, #66ED8A)',
    },
    {
      hora: 14,
      titulo: 'Hm... Será que vem mais uma por aí?',
      paragrafo: 'Tô de olho, hein! Marca aí pra gente continuar firme!',
      imagem: 'assets/imagens/brocolito/brocolito-duvida.png',
      gradient: 'linear-gradient(to right, #51B921 30%, #B7E370)',
    },
    {
      hora: 16,
      titulo: 'Glub glub! Já bebeu água hoje?',
      paragrafo: 'A hidratação é essencial para o seu bem-estar.',
      imagem: 'assets/imagens/brocolito/brocolito-agua.png',
      gradient: 'linear-gradient(to right, #2D8FFF, #A3E3FF)',
    },
    {
      hora: 18.5,
      titulo: 'Metade do caminho andado!',
      paragrafo: 'Continue firme até completar todas as refeições!',
      imagem: 'assets/imagens/brocolito/brocolito-pose.png',
      gradient: 'linear-gradient(to right, #3A6DE0, #1D479A )',
    },
    {
      hora: 20,
      titulo: 'Se marcar mais uma, eu comemoro...',
      paragrafo: 'Sério mesmo! Já tô preparando o passinho da vitória!',
      imagem: 'assets/imagens/brocolito/brocolito-ansioso.png',
      gradient: 'linear-gradient(to right, #896EFF, #A3BDFF)',
    },
    {
      hora: 23,
      titulo: 'Uau! Todas as refeições concluídas!',
      paragrafo: 'Seu futuro saudável agradece!',
      imagem: 'assets/imagens/brocolito/brocolito-feliz.png',
      gradient: 'linear-gradient(to right, #8D1C1C, #C04D4D)',
    },
  ];

  atualizarDivInterativa() {
    const agora = new Date();
    const horaAtual = agora.getHours() + agora.getMinutes() / 60;
    let periodo = this.horarios[0];

    for (let i = 0; i < this.horarios.length; i++) {
      if (horaAtual >= this.horarios[i].hora) {
        periodo = this.horarios[i];
      } else {
        break;
      }
    }
    this.divInterativa = periodo;
  }

  constructor(private dietaService: DietaService, private ngZone: NgZone) {
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
    this.atualizarDivInterativa();
    setInterval(() => {
      this.ngZone.run(() => this.atualizarDivInterativa());
    }, 60 * 1000);
  }

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
