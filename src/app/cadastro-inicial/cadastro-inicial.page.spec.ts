import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroInicialPage } from './cadastro-inicial.page';

describe('CadastroInicialPage', () => {
  let component: CadastroInicialPage;
  let fixture: ComponentFixture<CadastroInicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
