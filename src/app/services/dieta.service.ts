import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DietaService {
  private dietas = [
    {
      nome: 'Perder Peso',
      descricao:
        'Dieta hipocalórica, focada em alimentos leves, integrais e baixo teor de gordura.',
      imagem: 'assets/imagens/perder.webp',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          descricao:
            '1 fatia de pão integral, 1 ovo cozido, 1 fatia de queijo branco, 1 xícara de chá sem açúcar, 1 fatia de mamão.',
          checked: false,
        },
        {
          nome: 'Lanche da Manhã',
          descricao: '1 maçã pequena ou 1 iogurte desnatado.',
          checked: false,
        },
        {
          nome: 'Almoço',
          descricao:
            'Salada de folhas verdes, 2 colheres de arroz integral, 1 concha de feijão, 1 filé de frango grelhado, legumes cozidos.',
          checked: false,
        },
        {
          nome: 'Lanche da Tarde',
          descricao: '1 barra de cereal ou 1 fruta.',
          checked: false,
        },
        {
          nome: 'Jantar',
          descricao:
            'Sopa de legumes com carne magra ou omelete de claras com espinafre.',
          checked: false,
        },
        {
          nome: 'Ceia',
          descricao: 'Chá de camomila ou 1 copo de leite desnatado.',
          checked: false,
        },
      ],
    },
    {
      nome: 'Manter Peso',
      descricao:
        'Dieta equilibrada, com variedade de alimentos e porções moderadas para manutenção do peso.',
      imagem: 'assets/imagens/manter.webp',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          descricao:
            '2 fatias de pão integral, 1 colher de requeijão light, 1 copo de leite semidesnatado, 1 banana.',
          checked: false,
        },
        {
          nome: 'Lanche da Manhã',
          descricao: '1 iogurte natural com granola.',
          checked: false,
        },
        {
          nome: 'Almoço',
          descricao:
            'Salada variada, 3 colheres de arroz, 1 concha de feijão, 1 bife grelhado, legumes cozidos, 1 fatia de melancia.',
          checked: false,
        },
        {
          nome: 'Lanche da Tarde',
          descricao: '1 fatia de pão integral com queijo branco.',
          checked: false,
        },
        {
          nome: 'Jantar',
          descricao:
            'Salada de folhas, 2 colheres de arroz, 1 filé de peixe grelhado, legumes refogados.',
          checked: false,
        },
        {
          nome: 'Ceia',
          descricao: '1 fruta ou 1 copo de leite.',
          checked: false,
        },
      ],
    },
    {
      nome: 'Ganhar Peso',
      descricao:
        'Dieta hipercalórica, rica em proteínas, carboidratos complexos e gorduras saudáveis para ganho de massa.',
      imagem: 'assets/imagens/ganhar.webp',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          descricao:
            '3 fatias de pão integral, 2 ovos mexidos, 1 colher de pasta de amendoim, 1 copo de vitamina de banana com aveia e leite integral.',
          checked: false,
        },
        {
          nome: 'Lanche da Manhã',
          descricao: '1 barra de proteína ou 1 sanduíche natural.',
          checked: false,
        },
        {
          nome: 'Almoço',
          descricao:
            'Salada de folhas, 4 colheres de arroz, 1 concha de feijão, 1 filé grande de carne vermelha, batata doce cozida.',
          checked: false,
        },
        {
          nome: 'Lanche da Tarde',
          descricao: 'Iogurte integral com granola e frutas secas.',
          checked: false,
        },
        {
          nome: 'Jantar',
          descricao:
            'Macarrão integral com frango desfiado e legumes, azeite de oliva.',
          checked: false,
        },
        {
          nome: 'Ceia',
          descricao: 'Vitamina de frutas com leite integral e aveia.',
          checked: false,
        },
      ],
    },
  ];

  private dietaSelecionada = new BehaviorSubject(
    this.dietas[+localStorage.getItem('dietaSelecionada')! || 0]
  );
  dietaSelecionada$ = this.dietaSelecionada.asObservable();

  getDietas() {
    return this.dietas;
  }

  getDietaSelecionada() {
    return this.dietaSelecionada.value;
  }

  selecionarDieta(indice: number) {
    localStorage.setItem('dietaSelecionada', indice.toString());
    // Faz uma cópia profunda para não compartilhar o checked entre usuários
    const dieta = JSON.parse(JSON.stringify(this.dietas[indice]));
    this.dietaSelecionada.next(dieta);
  }
}
