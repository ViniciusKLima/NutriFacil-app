import { Component, OnInit } from '@angular/core';
import { DietaService } from '../services/dieta.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  dietas = this.dietaService.getDietas();
  dietaSelecionada = 0;

  constructor(private dietaService: DietaService) {}

  ngOnInit() {
    const dietaSalva = localStorage.getItem('dietaSelecionada');
    if (dietaSalva !== null) {
      this.dietaSelecionada = +dietaSalva;
    }
  }

  selecionarDieta(indice: number) {
    this.dietaSelecionada = indice;
    this.dietaService.selecionarDieta(indice);
    localStorage.setItem('dietaSelecionada', indice.toString());
  }
}