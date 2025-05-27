import { Component, AfterViewInit } from '@angular/core';
import ProgressBar from 'progressbar.js';
import { PerfilService } from '../services/perfil.service';

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
  historico: { valor: number; hora: string }[] = [];
  editando = false;

  private progressCircle: any;

  constructor(private perfilService: PerfilService) {}

  ionViewWillEnter() {
    // Busca a meta de água do usuário logado no backend
    const email = localStorage.getItem('email');
    if (email) {
      this.perfilService.getUsuarioPorEmail(email).subscribe(users => {
        if (users.length) {
          this.meta = users[0].metaAgua || 2000;
        } else {
          this.meta = 2000;
        }
        this.atualizarBarra();
      });
    } else {
      this.meta = 2000;
      this.atualizarBarra();
    }
  }

  ngAfterViewInit() {
    // Verifica se é um novo dia
    const dataSalva = localStorage.getItem('aguaHistoricoData');
    const hoje = new Date().toDateString();

    if (dataSalva === hoje) {
      // Recupera histórico e progresso salvos
      const historicoSalvo = localStorage.getItem('aguaHistorico');
      const progressoSalvo = localStorage.getItem('aguaProgressoAtual');
      this.historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];
      this.progressoAtual = progressoSalvo ? +progressoSalvo : 0;
    } else {
      // Novo dia: reseta histórico e progresso
      this.historico = [];
      this.progressoAtual = 0;
      this.salvarHistorico();
    }

    this.progressCircle = new ProgressBar.Circle('#progressCircle', {
      strokeWidth: 6,
      color: 'white',
      trailColor: '#2f974b',
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
      const horaAtual = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Adiciona valor e hora ao histórico
      this.historico.unshift({ valor: this.valorAdicionar, hora: horaAtual });

      this.atualizarBarra();
      this.salvarHistorico();
      this.valorAdicionar = null;
    }
  }

  ativarEdicao() {
    this.editando = !this.editando;
  }

  removerRegistro(index: number) {
    // Subtrai o valor do registro removido do progressoAtual
    this.progressoAtual -= this.historico[index].valor;
    // Remove o registro do histórico
    this.historico.splice(index, 1);
    this.salvarHistorico();
    this.atualizarBarra();
  }

  atualizarBarra() {
    let progresso = Math.min(this.progressoAtual / this.meta, 1);
    if (this.progressCircle) {
      this.progressCircle.animate(progresso);
    }
  }

  salvarHistorico() {
    localStorage.setItem('aguaHistorico', JSON.stringify(this.historico));
    localStorage.setItem('aguaProgressoAtual', this.progressoAtual.toString());
    localStorage.setItem('aguaHistoricoData', new Date().toDateString());
  }
}