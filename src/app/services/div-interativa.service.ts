import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivInterativaService {
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

  getDivInterativaAtual(): any {
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
    return periodo;
  }
}