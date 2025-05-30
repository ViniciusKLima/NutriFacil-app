import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietasPage } from './dietas.page';

describe('DietasPage', () => {
  let component: DietasPage;
  let fixture: ComponentFixture<DietasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietasPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
